import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

interface InquiryRow {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceType: string;
  message: string;
  budget: string | null;
  timeline: string | null;
  status: string;
  createdAt: Date;
}

export default function AdminDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRow | null>(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<number | null>(null);

  // Fetch inquiries
  const { data: inquiries = [], isLoading, error } = trpc.inquiries.list.useQuery();
  const updateStatusMutation = trpc.inquiries.updateStatus.useMutation();

  // Check authorization
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this dashboard. Only administrators can view inquiries.
          </p>
          <Link href="/">
            <a className="inline-block px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
              Return to Home
            </a>
          </Link>
        </div>
      </div>
    );
  }

  // Filter and search inquiries
  const filteredInquiries = useMemo(() => {
    return (inquiries as InquiryRow[]).filter((inquiry) => {
      const matchesSearch =
        searchTerm === "" ||
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.company?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
      const matchesService = serviceFilter === "all" || inquiry.serviceType === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [inquiries, searchTerm, statusFilter, serviceFilter]);

  const handleStatusChange = async (inquiryId: number, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: inquiryId,
        status: newStatus as "new" | "contacted" | "in-progress" | "completed",
      });
      toast.success("Inquiry status updated");
      setIsStatusDropdownOpen(null);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "contacted":
        return <Mail className="w-4 h-4 text-blue-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
  };

  const getServiceLabel = (serviceType: string) => {
    const labels: Record<string, string> = {
      "cloud-devops": "Cloud & DevOps",
      "it-security": "IT Security",
      "digital-marketing": "Digital Marketing",
      "ai-consultation": "AI Consultation",
      "cloud-cost-audit": "Cloud Cost Audit",
      "technical-consultation": "Technical Consultation",
      "other": "Other",
    };
    return labels[serviceType] || serviceType;
  };

  const stats = {
    total: inquiries.length,
    new: inquiries.filter((i: InquiryRow) => i.status === "new").length,
    contacted: inquiries.filter((i: InquiryRow) => i.status === "contacted").length,
    inProgress: inquiries.filter((i: InquiryRow) => i.status === "in-progress").length,
    completed: inquiries.filter((i: InquiryRow) => i.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage contact form inquiries</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Inquiries</p>
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" /> New
            </p>
            <p className="text-3xl font-bold text-foreground">{stats.new}</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" /> Contacted
            </p>
            <p className="text-3xl font-bold text-foreground">{stats.contacted}</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" /> In Progress
            </p>
            <p className="text-3xl font-bold text-foreground">{stats.inProgress}</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> Completed
            </p>
            <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-card border-border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Service
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="all">All Services</option>
                <option value="cloud-devops">Cloud & DevOps</option>
                <option value="it-security">IT Security</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="ai-consultation">AI Consultation</option>
                <option value="cloud-cost-audit">Cloud Cost Audit</option>
                <option value="technical-consultation">Technical Consultation</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setServiceFilter("all");
                }}
                variant="outline"
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Inquiries Table */}
        <Card className="bg-card border-border overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading inquiries...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Failed to load inquiries</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No inquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="border-b border-border hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{inquiry.name}</p>
                        {inquiry.company && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Building2 className="w-3 h-3" />
                            {inquiry.company}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-accent hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-4 h-4" />
                          {inquiry.email}
                        </a>
                        {inquiry.phone && (
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="text-xs text-muted-foreground flex items-center gap-1 mt-1 hover:text-foreground"
                          >
                            <Phone className="w-3 h-3" />
                            {inquiry.phone}
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-foreground">
                          {getServiceLabel(inquiry.serviceType)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setIsStatusDropdownOpen(
                                isStatusDropdownOpen === inquiry.id ? null : inquiry.id
                              )
                            }
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-colors"
                          >
                            {getStatusIcon(inquiry.status)}
                            <span className="text-sm font-medium text-foreground">
                              {getStatusLabel(inquiry.status)}
                            </span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          </button>

                          {isStatusDropdownOpen === inquiry.id && (
                            <div className="absolute top-full mt-2 left-0 bg-background border border-border rounded-lg shadow-lg z-50 min-w-48">
                              {["new", "contacted", "in-progress", "completed"].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(inquiry.id, status)}
                                  className="w-full text-left px-4 py-2 hover:bg-secondary/50 transition-colors flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                                >
                                  {getStatusIcon(status)}
                                  <span className="text-sm">{getStatusLabel(status)}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          onClick={() => setSelectedInquiry(inquiry)}
                          variant="outline"
                          size="sm"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedInquiry.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getServiceLabel(selectedInquiry.serviceType)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-muted-foreground hover:text-foreground text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-accent hover:underline"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  {selectedInquiry.phone && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="text-accent hover:underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  )}
                  {selectedInquiry.company && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Company
                      </p>
                      <p className="text-foreground">{selectedInquiry.company}</p>
                    </div>
                  )}
                  {selectedInquiry.budget && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Budget
                      </p>
                      <p className="text-foreground">{selectedInquiry.budget}</p>
                    </div>
                  )}
                  {selectedInquiry.timeline && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Timeline
                      </p>
                      <p className="text-foreground">{selectedInquiry.timeline}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                      Submitted
                    </p>
                    <p className="text-foreground">
                      {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    Message
                  </p>
                  <div className="bg-secondary/30 border border-border rounded-lg p-4">
                    <p className="text-foreground whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedInquiry(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </a>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
