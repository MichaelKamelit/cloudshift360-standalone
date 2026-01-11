import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Hassan",
    company: "TechStart Egypt",
    role: "CTO",
    content: "Michael helped us migrate our infrastructure to AWS and reduced our monthly cloud costs by 35%. The entire process was smooth and well-documented.",
    rating: 5,
    avatar: "AH",
  },
  {
    name: "Fatima Al-Mansouri",
    company: "Digital Solutions LLC",
    role: "Operations Manager",
    content: "Exceptional DevOps expertise. He implemented CI/CD pipelines that reduced our deployment time from 2 hours to 15 minutes. Highly recommended!",
    rating: 5,
    avatar: "FM",
  },
  {
    name: "Mohammed Karim",
    company: "Enterprise Systems Inc",
    role: "IT Director",
    content: "Outstanding Azure migration project. Michael's team ensured zero downtime during the transition of 500+ users. Professional and reliable.",
    rating: 5,
    avatar: "MK",
  },
  {
    name: "Sarah Johnson",
    company: "Global Tech Consulting",
    role: "Project Lead",
    content: "Best cloud architect I've worked with. His cost optimization strategies saved us $50K annually. Highly knowledgeable and responsive.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Omar El-Sayed",
    company: "Innovation Hub Cairo",
    role: "Founder",
    content: "Incredible SEO and digital marketing expertise. Our organic traffic increased by 150% in 3 months. Michael truly understands technical SEO.",
    rating: 5,
    avatar: "OE",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about our cloud solutions and digital services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-accent">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
