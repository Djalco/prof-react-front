import React, { Component } from 'react';
import messageService from '../services/message.service';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
            loading: true,
            submitting: false,
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadMessages();
    }

    loadMessages() {
        messageService.getAll()
            .then(response => {
                this.setState({
                    messages: response.data.data,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    error: 'Erreur lors du chargement des messages',
                    loading: false
                });
            });
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.newMessage.trim()) return;

        this.setState({ submitting: true });

        messageService.create({ text: this.state.newMessage })
            .then(() => {
                this.setState({ newMessage: '', submitting: false });
                this.loadMessages();
            })
            .catch(error => {
                this.setState({
                    error: 'Erreur lors de l\'ajout du message',
                    submitting: false
                });
            });
    }

    render() {
        const { messages, newMessage, loading, submitting, error } = this.state;

        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>💬 Messages</h2>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {/* Formulaire d'ajout de message */}
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Nouveau message</h5>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Écrivez votre message..."
                                    value={newMessage}
                                    onChange={this.handleChange}
                                    disabled={submitting}
                                />
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={submitting || !newMessage.trim()}
                                >
                                    {submitting ? 'Envoi...' : 'Envoyer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Liste des messages */}
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                ) : (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Messages ({messages.length})</h5>
                            {messages.length > 0 ? (
                                <div className="list-group">
                                    {messages.map((message, index) => (
                                        <div
                                            key={message.id || index}
                                            className="list-group-item"
                                        >
                                            <div className="d-flex w-100 justify-content-between">
                                                <p className="mb-1">{message.text}</p>
                                                <small className="text-muted">
                                                    {message.createdAt ? 
                                                        new Date(message.createdAt).toLocaleString() : 
                                                        'Date inconnue'
                                                    }
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="alert alert-info">
                                    Aucun message pour le moment. Soyez le premier à en écrire un !
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Messages;
