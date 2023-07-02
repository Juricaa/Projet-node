import http from "../http-common";

class EnseignantDataService {
  getAll() {
    return http.get("/enseignants");
  }

  get(matricule) {
    return http.get(`/enseignants/${matricule}`);
  }

  create(data) {
    return http.post("/enseignants", data);
  }

  update(matricule, data) {
    return http.put(`/enseignants/${matricule}`, data);
  }

  delete(matricule) {
    return http.delete(`/enseignants/${matricule}`);
  }

  deleteAll() {
    return http.delete(`/enseignants`);
  }

  findByTitle(matricule) {
    return http.get(`/enseignants?matricule=${matricule}`);
  }

  findPrestation(){
    return http.get("/enseignants/prestation")
  }
}

export default new EnseignantDataService();