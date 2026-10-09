import { useState } from "react";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

import styles from "./CadastrarCurso.module.css";

function CadastrarCurso() {
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        categoria: "",
        duracao: "",
        imagem: null,
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Proposta de curso:", formData);

        alert(
            "Proposta enviada com sucesso! O curso ficará aguardando análise."
        );
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <>
            <Navbar />

            <main className={styles.cadastrarCursoPage}>
                {/* HERO */}
                <section className={styles.cadastrarCursoHero}>
                    <span className={styles.heroBadge}>
                        Área do Voluntário
                    </span>

                    <h1>Propor novo curso</h1>

                    <p>
                        Compartilhe seu conhecimento e contribua para a
                        formação dos usuários da plataforma Equitá.
                    </p>
                </section>

                {/* FORMULÁRIO */}
                <section className={styles.formSection}>
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h2>Informações do curso</h2>

                            <p className={styles.formDescription}>
                                Preencha as informações abaixo para enviar sua
                                proposta de curso.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* TÍTULO */}
                            <div className={styles.formGroup}>
                                <label htmlFor="titulo">
                                    Título do curso
                                </label>

                                <input
                                    id="titulo"
                                    name="titulo"
                                    type="text"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    placeholder="Digite o título do curso"
                                    required
                                />
                            </div>

                            {/* DESCRIÇÃO */}
                            <div className={styles.formGroup}>
                                <label htmlFor="descricao">
                                    Descrição do curso
                                </label>

                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    rows="6"
                                    value={formData.descricao}
                                    onChange={handleChange}
                                    placeholder="Explique o conteúdo, objetivo e proposta do curso"
                                    required
                                />
                            </div>

                            {/* CATEGORIA + DURAÇÃO */}
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="categoria">
                                        Categoria
                                    </label>

                                    <select
                                        id="categoria"
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Selecione uma categoria
                                        </option>

                                        <option value="direitos">
                                            Direitos
                                        </option>

                                        <option value="cidadania">
                                            Cidadania
                                        </option>

                                        <option value="educacao">
                                            Educação
                                        </option>

                                        <option value="formacao">
                                            Formação profissional
                                        </option>

                                        <option value="outros">
                                            Outros
                                        </option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="duracao">
                                        Duração estimada
                                    </label>

                                    <input
                                        id="duracao"
                                        name="duracao"
                                        type="text"
                                        value={formData.duracao}
                                        onChange={handleChange}
                                        placeholder="Ex.: 10 horas"
                                        required
                                    />
                                </div>
                            </div>

                            {/* IMAGEM */}
                            <div className={styles.formGroup}>
                                <label htmlFor="imagem">
                                    Imagem do curso
                                </label>

                                <input
                                    id="imagem"
                                    name="imagem"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                />

                                <small className={styles.inputHelp}>
                                    Escolha uma imagem para representar o
                                    curso.
                                </small>
                            </div>

                            {/* INFORMAÇÃO SOBRE ANÁLISE */}
                            <div className={styles.infoBox}>
                                <span
                                    className={styles.infoIcon}
                                    aria-hidden="true"
                                >
                                    ℹ️
                                </span>

                                <div>
                                    <strong>Envio para análise</strong>

                                    <p>
                                        Após o envio, a proposta será
                                        encaminhada para análise antes de ser
                                        disponibilizada na plataforma.
                                    </p>
                                </div>
                            </div>

                            {/* BOTÕES */}
                            <div className={styles.formActions}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    Enviar proposta
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default CadastrarCurso;
