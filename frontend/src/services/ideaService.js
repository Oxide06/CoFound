import api from "@/services/axiosInstance";
import { IDEAS } from "@/constants/apiEndpoints";

export const ideaService = {
  createIdea: (data) => api.post(IDEAS.ROOT, data),
  getAllIdeas: (filters = {}) => api.get(IDEAS.ROOT, { params: filters }),
  getIdeaById: (id) => api.get(IDEAS.BY_ID(id)),
  updateIdea: (id, data) => api.patch(IDEAS.BY_ID(id), data),
  deleteIdea: (id) => api.delete(IDEAS.BY_ID(id))
};
