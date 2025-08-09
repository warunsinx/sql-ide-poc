import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { useConnectionsStore } from "@/stores/useConnectionsStore";
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { SidebarMenuButton } from "../ui/sidebar";
import { LucideDatabase, LucidePlus } from "lucide-react";

export default function AddConnectionBtn() {
  const { testConnection, addConnection } = useConnectionsStore();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("5432");
  const [database, setDatabase] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const buildConn = () => ({
    name: name.trim(),
    host: host.trim(),
    port: Number.parseInt(port, 10) || 5432,
    database: database.trim(),
    username: username.trim(),
    password,
    type: "postgres" as const,
  });

  const validate = (isTest: boolean = false) => {
    if (!name.trim() && !isTest) return "Connection Name is required.";
    if (!host.trim()) return "Host is required.";
    if (!database.trim()) return "Database is required.";
    if (!username.trim()) return "Username is required.";
    if (!port || Number.isNaN(Number.parseInt(port, 10)))
      return "Valid port is required.";
    return undefined;
  };

  const handleTestConnection = async () => {
    const error = validate(true);
    if (error) {
      toast.error(error);
      return;
    }
    setIsTesting(true);
    try {
      await testConnection(buildConn());
      toast.success("Connection test succeeded.");
    } catch (err) {
      console.error(err);
      toast.error("Connection test failed.");
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async () => {
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setIsSaving(true);
    try {
      await addConnection(buildConn());
      toast.success("Connection saved.");
      setOpen(false);
      // reset form
      setName("");
      setHost("");
      setPort("5432");
      setDatabase("");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save connection.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LucidePlus className="w-4 h-4 mr-2" />
              <span>Add Connection</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Connection</DialogTitle>
          <DialogDescription>
            Now only PostgreSQL is supported.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Connection Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
          <Input
            placeholder="Port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
          <Input
            placeholder="Database"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            type="submit"
            className="mr-auto"
            onClick={handleTestConnection}
            disabled={isTesting || isSaving}
          >
            {isTesting ? "Testing..." : "Test Connection"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleSave}
            disabled={isSaving || isTesting}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
