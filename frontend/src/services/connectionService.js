import api from "@/services/axiosInstance";
import { CONNECTIONS } from "@/constants/apiEndpoints";

export const connectionService = {
  sendRequest: (userId) => api.post(CONNECTIONS.ROOT, { receiverId: userId }),
  getConnections: () => api.get(CONNECTIONS.ROOT),
  updateStatus: (id, status) => api.patch(CONNECTIONS.BY_ID(id), { status })
};
