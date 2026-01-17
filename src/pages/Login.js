import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/auth.service";
import { authUtils } from "../utils/auth";
import TextInput from "../components/common/TextInput";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      mdp: "",
      redirectToHome: false,
      error: "",
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const { id, value } = evt.target;
    this.setState({ [id]: value, error: "" });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true, error: "" });

    authService.login({
      email: this.state.email,
      mdp: this.state.mdp
    })
      .then(response => {
        if (response.data.token) {
          authUtils.setToken(response.data.token);
          this.setState({ redirectToHome: true });
        }
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || "Identifiants incorrects";
        this.setState({
          error: errorMessage,
          loading: false
        });
      });
  }

  render() {
    if (this.state.redirectToHome) {
      return <Navigate to="/" replace />;
    }

    const { error, loading } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Connexion</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={this.handleSubmit}>
                <TextInput
                  id="email"
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
                <TextInput
                  id="mdp"
                  label="Mot de passe"
                  type="password"
                  value={this.state.mdp}
                  onChange={this.handleChange}
                  required
                /> <br />
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;