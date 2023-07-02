import React, { Component } from "react";
import EnseignantDataService from "../services/enseignant.service";
import { Modal, Button, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";



export default class EnseignantsList extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    
    this.onChangeMat = this.onChangeMat.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeTh = this.onChangeTh.bind(this);
    this.onChangeNb = this.onChangeNb.bind(this);

    this.onChangeMatri = this.onChangeMatri.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTheure = this.onChangeTheure.bind(this);
    this.onChangeNbHeure = this.onChangeNbHeure.bind(this);
    this.saveEnseignant = this.saveEnseignant.bind(this);

    this.retrievePrestation= this.retrievePrestation.bind(this);
    this.retrieveEnseignant = this.retrieveEnseignant.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEnseignant = this.setActiveEnseignant.bind(this);
    this.updateEnseignant = this.updateEnseignant.bind(this);
    this.removeAllEnseignants = this.removeAllEnseignants.bind(this);
    this.searchMat = this.searchMat.bind(this);
    this.deletEnseignant = this.deletEnseignant.bind(this);
    this.getEnseignant = this.getEnseignant.bind(this);

    this.state = {
      enseignants: [],
      prestations: [],
      currentEnseignant: null,
      currentIndex: -1,

      showToast: false,
      toastMessage: "",
      toastType: "success",

      showModal: false,
      showModalAdd: false,
      
      searchMat: ""
      
    };

    
  }

  componentDidMount() {
    this.retrieveEnseignant();
   this.retrievePrestation();
   
  }


  showToastMessage = (message, type) => {
    this.setState({
      showToast: true,
      toastMessage: message,
      toastType: type,
    });
    
    setTimeout(() => {
      this.setState({
        showToast: false,
        toastMessage: "",
        toastType: "success",
      });
    }, 3000); // Ferme le toast après 3 secondes (3000 millisecondes)
  }
  
  
  onChangeMat(e) {
    
    const matricule = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEnseignant: {
          ...prevState.currentEnseignant,
          matricule: matricule
        }
      };
    });
   
      
  }
  
  onChangeNom(e) {
    const nom = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEnseignant: {
          ...prevState.currentEnseignant,
          nom: nom
        }
      };
    });
  }

  onChangeTh(e) {
    const tauxHoraire = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEnseignant: {
          ...prevState.currentEnseignant,
          tauxHoraire: tauxHoraire
        }
      };
    });
  }
  
  onChangeNb(e) {
    const nbHeure = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEnseignant: {
          ...prevState.currentEnseignant,
          nbHeure: nbHeure
        }
      };
    });
  }
  
  
  
  onChangeMatri(e) {
    this.setState({
      matricule: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      nom: e.target.value
    });
  }
  
  onChangeTheure(e) {
    this.setState({
      tauxHoraire: e.target.value
    });
  }

  onChangeNbHeure(e) {
    this.setState({
      nbHeure: e.target.value
    });
  }
  
  saveEnseignant() {
    var data = {
      matricule: this.state.matricule,
      nom: this.state.nom,
      tauxHoraire: this.state.tauxHoraire,
      nbHeure: this.state.nbHeure,
      
    };

    EnseignantDataService.create(data)
      .then(response => {
        this.setState({
          matricule: response.data.matricule,
          nom: response.data.nom,
          tauxHoraire: response.data.tauxHoraire,
          nbHeure: response.data.nbHeure,
          
          
        });
        
        this.refreshList();
        this.closeModal();
        this.showToastMessage("Enseignant ajouté avec succès.", "success");
      })
      .catch(e => {
        console.log(e);
        this.showToastMessage("Une erreur s'est produite lors de l'ajout de l'enseignant.", "danger");
      });
      
      
    }
    
    searchMat() {
      this.setState({
        currentEnseignant: null,
        currentIndex: -1
      });
      
      EnseignantDataService.findByTitle(this.state.searchMat)
      .then(response => {
          this.setState({
              enseignants: response.data
            });
            console.log(response.data);
          })
        .catch(e => {
          console.log(e);
        });
    }

    onChangeSearchTitle(e) {
      const searchTitle = e.target.value;
    
    this.setState({
      searchMat: searchTitle
    });

    this.searchMat();
  }
  
    retrievePrestation(){
      
    EnseignantDataService.findPrestation()
    .then(response=>{
      this.setState({
        prestations: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });

  }
 

  retrieveEnseignant() {
    EnseignantDataService.getAll()
    .then(response => {
      this.setState({
        enseignants: response.data
      });
      console.log(response.data);
      
      
    })
    .catch(e => {
      console.log(e);
    });
    
   
  }
  
  refreshList() {
    this.retrieveEnseignant();
    this.setState({
        currentEnseignant: null,
        currentIndex: -1,
        searchMat: ""
      });
      
    }
    
    setActiveEnseignant(enseignant, index) {
      this.setState({
        currentEnseignant: enseignant,
          currentIndex: index
        });
  }

  getEnseignant(matricule) {
    EnseignantDataService.get(matricule)
      .then(response => {
        this.setState({
          currentEnseignant: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEnseignant() {
    EnseignantDataService.update(
      this.state.currentEnseignant.matricule,
      this.state.currentEnseignant
    )
      .then(response => {
        console.log(response.data);
        this.refreshList();
        this.closeModal();
        this.showToastMessage("mis à jour avec succès.", "success");
        this.retrievePrestation();
      })
      .catch(e => {
        console.log(e);
        this.showToastMessage("Une erreur s'est produite lors de la mise à jour de l'enseignant.", "danger");
      });

  }

  deletEnseignant(matricule) {    
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?")) {
      EnseignantDataService.delete(matricule)
      .then(response => {
        
        console.log(response.data);
        this.refreshList();
        this.showToastMessage("Enseignant supprimé avec succès.", "success");
      })
      .catch(e => {
          console.log(e);
          this.showToastMessage("Une erreur s'est produite lors de la suppression de l'enseignant.", "danger");
          });
      }
    }

  removeAllEnseignants() {
    EnseignantDataService.deleteAll()
      .then(response => {
          console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  

  openModal = () => {
    this.setState({ showModal: true });
  }

  openModalAdd = () => {
    this.setState({ showModalAdd: true });
  }
  
  closeModal = () => {
    this.setState({ showModal: false, showModalAdd: false });
  }
  

  render() {
    const { searchMat, enseignants, prestations, currentEnseignant } = this.state;

    return (

      <div className="container">
        <div className="col-md-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by matricule ou nom"
              value={searchMat}
              onChange={this.onChangeSearchTitle}
            /> 
            &nbsp;&nbsp;&nbsp;&nbsp;
            
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.refreshList}
              >
                <FontAwesomeIcon icon={faArrowRotateRight} />
                            
              </button>
            </div>
          </div>
        </div>
        
        
      
       <Button className="btn btn-primary" onClick={()=>{this.openModalAdd()}}>Ajout</Button>

       <Toast
              show={this.state.showToast}
              onClose={() => this.setState({ showToast: false })}
              delay={3000}
              autohide
              style={{
                position: 'fixed',
                top: 20,
                right: 20,
                minWidth: 200,
              }}
            >
              <Toast.Header
                closeButton={false}
                className={`bg-${this.state.toastType} text-white`}
              >
                <strong className="mr-auto">Message</strong>
              </Toast.Header>
              <Toast.Body>{this.state.toastMessage}</Toast.Body>
        </Toast>


    
      
        <div className="container p-5 text-center " >
          
            <div className="row">
            <h4>Liste des Enseignants</h4>

            


                <table className="table table-striped ">
                        <thead className="thead-dark">
                            <tr >
                                <th>Matricule</th>
                                <th>Nom</th>
                                <th>Taux horaire</th>
                                <th>Nombre Heure</th>
                                <th>Prestation</th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {enseignants && enseignants.map((enseignant, index) => (
                            <tr key={enseignant.matricule} >
                                <td>#{enseignant.matricule}</td>
                                <td>{enseignant.nom}</td>
                                <td>{enseignant.tauxHoraire.toLocaleString('fr-FR')} Ar/h</td>
                                <td>{enseignant.nbHeure} Heure</td>
                                <td>{enseignant.prestation.toLocaleString('fr-FR')} Ariary</td>
                                
                                <td>
                                    <button className="btn btn-outline-primary btn-sm" 
                                        onClick={() => {this.setActiveEnseignant(enseignant, index); this.openModal();}} key={index} >Modifier </button>
                                         &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger btn-sm" onClick={() =>{this.deletEnseignant(enseignant.matricule)}}>Supprimer</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                </table>
            </div>

            <div className="container ">

                <div className="alert alert-primary" role="alert">
                    <div>                      
                    {prestations.map(presta=>(
                      <table className="table table-striped ">
                        <thead className="thead-dark">
                          
                         <th className=""> PRESTATION</th>
                          
                         <th>Total: {presta.prestation_T.toLocaleString('fr-FR')} Ar</th>
                         <th>Max: {presta.prestation_Max.toLocaleString('fr-FR')} Ar</th>
                         <th>Min: {presta.prestation_Min.toLocaleString('fr-FR')} Ar</th>
                          
                        </thead>
                      </table>
                    ))}
                    
                    </div>
                                        
                </div>
                 
                      
            </div>


          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEnseignants}
          >
            Remove All
          </button>
        </div>

          {/* Modal d'ajout d'un enseignant */}
      <Modal show={this.state.showModalAdd} onHide={this.closeModal}  backdrop="static" keyboard={false} contentClassName="contentClassName">
            <Modal.Header closeButton>
                    <Modal.Title>Ajout Enseignant</Modal.Title>
            </Modal.Header >
                          
              <Modal.Body>
                
              
            <div className="form-group">
              <label htmlFor="title">Matricule</label>
              <input
                type="text"
                className="form-control"
                id="matricule"
                required
                value={this.state.matricule}
                onChange={this.onChangeMatri}
                name="matricule"
               />
            </div>

            <div className="form-group">
              <label htmlFor="title">nom</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                required
                value={this.state.title}
                onChange={this.onChangeName}
                name="nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Taux Horaire</label>
              <input
                type="number"
                className="form-control"
                id="tauxHoraire"
                required
                value={this.state.tauxHoraire}
                onChange={this.onChangeTheure}
                name="tauxHoraire"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Nombre Horaire</label>
              <input
                type="number"
                className="form-control"
                id="nbHeure"
                required
                value={this.state.nbHeure}
                onChange={this.onChangeNbHeure}
                name="nbHeure"
              />
            </div>
 
                       
              </Modal.Body>
           

            <Modal.Footer className="text-center">
              <Button variant="secondary" onClick={this.closeModal}>Fermer</Button>
              
              <Button type="submit" variant="primary" onClick={this.saveEnseignant}>Enregistrer</Button>
              
            </Modal.Footer>

      </Modal>



          {/* Modal modification d'un enseignant */}
                         
      <Modal show={this.state.showModal} onHide={this.closeModal} contentClassName="contentClassName">
            <Modal.Header closeButton>
                    <Modal.Title>Modification Enseignant</Modal.Title>
            </Modal.Header >
            {currentEnseignant ? (                  
              <Modal.Body>
                
                                                            
                          <div className="form-group">
                            <label htmlFor="matricule">Matricule</label>
                            <input
                              type="text"
                              className="form-control"
                              id="matricule"
                              value={currentEnseignant.matricule}
                              onChange={this.onChangeMat}
                              readonly="true"/>
                          </div>
                          
                          <div className="form-group">
                            <label htmlFor="nom">Nom</label>
                            <input
                              type="text"
                              className="form-control"
                              id="nom"
                              value={currentEnseignant.nom}
                              onChange={this.onChangeNom}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="tauxHoraire">Taux Horaire</label>
                            <input
                              type="number"
                              className="form-control"
                              id="tauxHoraire"
                              value={currentEnseignant.tauxHoraire}
                              onChange={this.onChangeTh}
                            />
                          </div>
                          
                          

                          <div className="form-group">
                            <label htmlFor="description">Nombre Horaire</label>
                            <input
                              type="number"
                              className="form-control"
                              id="nbHeure"
                              required
                              value={currentEnseignant.nbHeure}
                              onChange={this.onChangeNb}
                              name="nbHeure"
                            />
                          </div>

                       
              </Modal.Body>
             ): (
              <div>
                <br />
                <p></p>
              </div>
            )} 

            <Modal.Footer className="text-center">
              <Button variant="secondary" onClick={this.closeModal}>Fermer</Button>
              
              <Button variant="primary" onClick={currentEnseignant ? this.updateEnseignant : this.saveEnseignant}>
              {currentEnseignant ? "Mettre à jour" : "Ajouter"}
            </Button>
              
            </Modal.Footer>

      </Modal>




      </div>
    );
  }
}

