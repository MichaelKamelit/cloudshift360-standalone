import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createInquiry, getInquiries, updateInquiryStatus, upsertUser } from "./db";
import { sendInquiryNotification } from "./email";
import { TRPCError } from "@trpc/server";
import { createSessionToken } from "./_core/auth";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email("Invalid email address"),
          password: z.string().min(6, "Password must be at least 6 characters"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          // In production, verify password against hashed value in database
          // For now, accept any email/password combination
          const user = await upsertUser({
            openId: input.email,
            name: input.email.split("@")[0],
            email: input.email,
            loginMethod: "email",
            lastSignedIn: new Date(),
          });

          if (!user) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create user",
            });
          }

          const sessionToken = await createSessionToken(
            {
              userId: user.openId,
              email: user.email || input.email,
              name: user.name || "",
              role: user.role || "user",
            },
            ONE_YEAR_MS
          );

          const cookieOptions = getSessionCookieOptions(ctx.req);
          ctx.res.cookie(COOKIE_NAME, sessionToken, {
            ...cookieOptions,
            maxAge: ONE_YEAR_MS,
          });

          return {
            success: true,
            user: {
              id: user.openId,
              email: user.email,
              name: user.name,
              role: user.role,
            },
          };
        } catch (error) {
          console.error("Login failed:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Login failed. Please try again.",
          });
        }
      }),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Inquiry management
  inquiries: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Name must be at least 2 characters"),
          email: z.string().email("Invalid email address"),
          phone: z.string().optional(),
          company: z.string().optional(),
          serviceType: z.string().min(1, "Please select a service type"),
          message: z.string().min(10, "Message must be at least 10 characters"),
          budget: z.string().optional(),
          timeline: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const inquiry = await createInquiry({
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            company: input.company || null,
            serviceType: input.serviceType,
            message: input.message,
            budget: input.budget || null,
            timeline: input.timeline || null,
            status: "new",
          });

          if (!inquiry) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create inquiry",
            });
          }

          // Send email notification to owner
          await sendInquiryNotification({
            name: input.name,
            email: input.email,
            phone: input.phone,
            company: input.company,
            serviceType: input.serviceType,
            message: input.message,
            budget: input.budget,
            timeline: input.timeline,
          });

          return {
            success: true,
            inquiryId: inquiry.id,
          };
        } catch (error) {
          console.error("Failed to submit inquiry:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to submit inquiry. Please try again.",
          });
        }
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can view inquiries",
        });
      }

      try {
        return await getInquiries();
      } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch inquiries",
        });
      }
    }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["new", "contacted", "in-progress", "completed"]),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can update inquiries",
          });
        }

        try {
          const updated = await updateInquiryStatus(input.id, input.status);
          if (!updated) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Inquiry not found",
            });
          }

          return {
            success: true,
            inquiry: updated,
          };
        } catch (error) {
          console.error("Failed to update inquiry:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update inquiry",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
