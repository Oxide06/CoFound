import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { connectionService } from "@/services/connectionService";
import { normalizeApiData } from "@/utils/helpers";

const tabs = [
  ["received", "Received Requests"],
  ["sent", "Sent Requests"],
  ["connected", "Connected"]
];

export default function Connections() {
  const [active, setActive] = useState("received");
  const [connections, setConnections] = useState({ received: [], sent: [], connected: [] });

  const loadConnections = () => {
    connectionService
      .getConnections()
      .then((response) => setConnections(normalizeApiData(response)))
      .catch(() => setConnections({ received: [], sent: [], connected: [] }));
  };

  useEffect(loadConnections, []);

  const update = async (id, status) => {
    try {
      await connectionService.updateStatus(id, status);
      toast.success("Status updated");
      loadConnections();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update status");
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-12">
        <h1 className="font-display text-3xl font-semibold">Connections</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          {tabs.map(([key, label]) => (
            <Button key={key} variant={active === key ? "primary" : "outline"} onClick={() => setActive(key)}>{label}</Button>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          {(connections[active] || []).length === 0 && <Card><p className="text-text-muted">No connections in this tab yet.</p></Card>}
          {(connections[active] || []).map((connection) => {
            const person = active === "sent" ? connection.receiver : connection.sender;
            return (
              <Card key={connection._id} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar src={person?.avatar?.url} name={person?.name} />
                  <div>
                    <div className="font-semibold">{person?.name}</div>
                    <div className="text-sm text-text-muted">{person?.role}</div>
                  </div>
                </div>
                {active === "received" && (
                  <div className="flex gap-3">
                    <Button onClick={() => update(connection._id, "accepted")}>Accept</Button>
                    <Button variant="danger" onClick={() => update(connection._id, "rejected")}>Reject</Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
