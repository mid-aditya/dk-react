import {
  Bot,
  Box,
  Building,
  CheckCircle,
  CheckSquare,
  ChevronRight,
  Download,
  Edit,
  File,
  FileText,
  Folder,
  List,
  Mail,
  Map,
  MessageCircle,
  Phone,
  PhoneOutgoing,
  PlusCircle,
  Radio,
  Server,
  Settings as SettingsIcon,
  Sliders,
  Star,
  Ticket,
  Type,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import WorkspaceLayout from "../../components/WorkspaceLayout";

interface SettingItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  description?: string;
}

interface SettingCategory {
  id: string;
  label: string;
  icon?: React.ReactNode;
  items: SettingItem[];
}

const Setting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("general");

  const settingCategories: SettingCategory[] = [
    {
      id: "general",
      label: "General",
      icon: <SettingsIcon className="w-4 h-4" />,
      items: [
        {
          id: "user-management",
          label: "User Management",
          path: "/settings/general/user-management",
          icon: <User className="w-5 h-5" />,
          description: "Manage users and permissions",
        },
        {
          id: "company-modules",
          label: "Company Modules",
          path: "/settings/general/company-modules",
          icon: <Building className="w-5 h-5" />,
          description: "Configure company modules",
        },
        {
          id: "channel",
          label: "Channel",
          path: "/settings/general/channel",
          icon: <MessageCircle className="w-5 h-5" />,
          description: "Manage communication channels",
        },
        {
          id: "group-route",
          label: "Group Route",
          path: "/settings/general/group-route",
          icon: <Map className="w-5 h-5" />,
          description: "Configure group routing",
        },
        {
          id: "bot-interaction",
          label: "Bot Interaction",
          path: "/settings/general/bot-interaction",
          icon: <Bot className="w-5 h-5" />,
          description: "Configure bot interactions",
        },
        {
          id: "config",
          label: "Config",
          path: "/settings/general/config",
          icon: <Sliders className="w-5 h-5" />,
          description: "General configuration",
        },
        {
          id: "config-email",
          label: "Config Email",
          path: "/settings/general/config/email",
          icon: <Mail className="w-5 h-5" />,
          description: "Email configuration",
        },
        {
          id: "config-pbx",
          label: "Config PBX",
          path: "/settings/general/config/pbx",
          icon: <Phone className="w-5 h-5" />,
          description: "PBX configuration",
        },
        {
          id: "config-smtp",
          label: "Config SMTP",
          path: "/settings/general/config/smtp",
          icon: <Server className="w-5 h-5" />,
          description: "SMTP configuration",
        },
        {
          id: "hsm-approve",
          label: "HSM Approve",
          path: "/settings/general/hsm/approve",
          icon: <CheckCircle className="w-5 h-5" />,
          description: "Approve HSM templates",
        },
        {
          id: "hsm-create",
          label: "HSM Create",
          path: "/settings/general/hsm/create",
          icon: <PlusCircle className="w-5 h-5" />,
          description: "Create HSM templates",
        },
        {
          id: "whatsapp-blast",
          label: "WhatsApp Blast",
          path: "/settings/general/whatsapp/blast",
          icon: <Radio className="w-5 h-5" />,
          description: "Manage WhatsApp blasts",
        },
        {
          id: "whatsapp-import",
          label: "WhatsApp Import Data",
          path: "/settings/general/whatsapp/import-data",
          icon: <Download className="w-5 h-5" />,
          description: "Import WhatsApp data",
        },
        {
          id: "blast",
          label: "Blast",
          path: "/settings/general/blast",
          icon: <Mail className="w-5 h-5" />,
          description: "Manage blast plain text templates",
        },
      ],
    },
    {
      id: "data-ticket",
      label: "Data Ticket",
      icon: <Ticket className="w-4 h-4" />,
      items: [
        {
          id: "article",
          label: "Article",
          path: "/settings/data-ticket/article",
          icon: <File className="w-5 h-5" />,
          description: "Manage articles",
        },
        {
          id: "category",
          label: "Category",
          path: "/settings/data-ticket/category",
          icon: <Folder className="w-5 h-5" />,
          description: "Manage categories",
        },
        {
          id: "sub-category",
          label: "Sub Category",
          path: "/settings/data-ticket/sub-category",
          icon: <ChevronRight className="w-5 h-5" />,
          description: "Manage sub categories",
        },
        {
          id: "priority",
          label: "Priority",
          path: "/settings/data-ticket/priority",
          icon: <Star className="w-5 h-5" />,
          description: "Manage priorities",
        },
        {
          id: "status",
          label: "Status",
          path: "/settings/data-ticket/status",
          icon: <CheckSquare className="w-5 h-5" />,
          description: "Manage statuses",
        },
      ],
    },
    {
      id: "data-outbound",
      label: "Data Outbound",
      icon: <PhoneOutgoing className="w-4 h-4" />,
      items: [
        {
          id: "category",
          label: "Category",
          path: "/settings/data-outbound/category",
          icon: <Folder className="w-5 h-5" />,
          description: "Manage categories",
        },
        {
          id: "sub-category",
          label: "Sub Category",
          path: "/settings/data-outbound/sub-category",
          icon: <ChevronRight className="w-5 h-5" />,
          description: "Manage sub categories",
        },
        {
          id: "priority",
          label: "Priority",
          path: "/settings/data-outbound/priority",
          icon: <Star className="w-5 h-5" />,
          description: "Manage priorities",
        },
        {
          id: "status",
          label: "Status",
          path: "/settings/data-outbound/status",
          icon: <CheckSquare className="w-5 h-5" />,
          description: "Manage statuses",
        },
        {
          id: "script-outbound",
          label: "Script Outbound",
          path: "/settings/data-outbound/script-outbound",
          icon: <FileText className="w-5 h-5" />,
          description: "Manage outbound scripts",
        },
        {
          id: "import-data",
          label: "Import Data",
          path: "/settings/data-outbound/import-data",
          icon: <Download className="w-5 h-5" />,
          description: "Import outbound data",
        },
      ],
    },
    {
      id: "form-builder-ticket",
      label: "Form Builder Ticket",
      icon: <Edit className="w-4 h-4" />,
      items: [
        {
          id: "category",
          label: "Category",
          path: "/settings/form-builder-ticket/category",
          icon: <Folder className="w-5 h-5" />,
          description: "Manage categories",
        },
        {
          id: "component",
          label: "Component",
          path: "/settings/form-builder-ticket/component",
          icon: <Box className="w-5 h-5" />,
          description: "Manage components",
        },
        {
          id: "config-field",
          label: "Config Field",
          path: "/settings/form-builder-ticket/config-field",
          icon: <Sliders className="w-5 h-5" />,
          description: "Configure form fields",
        },
        {
          id: "field",
          label: "Field",
          path: "/settings/form-builder-ticket/field",
          icon: <Type className="w-5 h-5" />,
          description: "Manage form fields",
        },
        {
          id: "jenis-pengaduan",
          label: "Jenis Pengaduan",
          path: "/settings/form-builder-ticket/jenis-pengaduan",
          icon: <List className="w-5 h-5" />,
          description: "Manage complaint types",
        },
      ],
    },
    {
      id: "form-builder-qa",
      label: "Form Builder QA",
      icon: <CheckSquare className="w-4 h-4" />,
      items: [
        {
          id: "category",
          label: "Category",
          path: "/settings/form-builder-qa/category",
          icon: <Folder className="w-5 h-5" />,
          description: "Manage categories",
        },
        {
          id: "component",
          label: "Component",
          path: "/settings/form-builder-qa/component",
          icon: <Box className="w-5 h-5" />,
          description: "Manage components",
        },
        {
          id: "config-field",
          label: "Config Field",
          path: "/settings/form-builder-qa/config-field",
          icon: <Sliders className="w-5 h-5" />,
          description: "Configure form fields",
        },
        {
          id: "field",
          label: "Field",
          path: "/settings/form-builder-qa/field",
          icon: <Type className="w-5 h-5" />,
          description: "Manage form fields",
        },
        {
          id: "jenis-pengaduan",
          label: "Jenis Pengaduan",
          path: "/settings/form-builder-qa/jenis-pengaduan",
          icon: <List className="w-5 h-5" />,
          description: "Manage complaint types",
        },
      ],
    },
  ];

  const activeCategory = settingCategories.find((cat) => cat.id === activeTab);

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex-shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1 px-6 min-w-max">
            {settingCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 flex items-center gap-2 whitespace-nowrap ${
                  activeTab === category.id
                    ? "border-[var(--accent-color)] text-[var(--accent-color)]"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-color)]"
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[var(--bg-primary)]">
          {activeCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {activeCategory.items.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="group block p-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl transition-colors duration-200 hover:border-[var(--accent-color)]"
                >
                  <div className="flex items-start gap-4">
                    {item.icon && (
                      <div className="w-12 h-12 flex items-center justify-center bg-[var(--bg-tertiary)] rounded-lg text-[var(--accent-color)] flex-shrink-0 group-hover:bg-[var(--accent-color)] group-hover:text-white transition-colors duration-200">
                        {item.icon}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-color)] transition-colors duration-200">
                        {item.label}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Setting;
