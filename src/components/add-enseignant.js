import React, { Component } from "react";
import EnseignantDataService from "../services/enseignant.service";




export default class AddEnseignant extends Component {
  constructor(props) {
    super(props);
    this.onChangeMatri = this.onChangeMatri.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTheure = this.onChangeTheure.bind(this);
    this.onChangeNbHeure = this.onChangeNbHeure.bind(this);
    this.saveEnseignant = this.saveEnseignant.bind(this);
    this.newEnseignant = this.newEnseignant.bind(this);
   
    this.state = {
      matricule:"",
      nom: "",
      tauxHoraire: "", 
      nbHeure: "",
      
      
      submitted: false
    };
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
        window.location.href = "/enseignants";
        console.log(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });

      
  }

  newEnseignant() {
    this.setState({
        matricule:"",
        nom: "",
        tauxHoraire: "", 
        nbHeure: "",

      submitted: false
    });
  }

  render() {

    
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEnseignant}>
              Add
            </button>
          </div>
        ) : (
          <div>
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

            <button onClick={this.saveEnseignant}  className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
