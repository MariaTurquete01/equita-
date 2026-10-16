import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import styles from "./sobre.module.css";

function Sobre() {
    return (
        <>
            <Navbar />

            <main className={styles.aboutPage}>
                <section className={styles.aboutHero}>
                    <span className={styles.heroBadge}>Sobre o Equitá</span>
                    <h1>Quando a informação deixa de ser só dado e vira proteção.</h1>
                    <p>
                        O Equitá nasceu da necessidade de criar um espaço mais humano
                        e acessível para quem busca ajuda, orientação e segurança. Nossa
                        proposta é conectar pessoas a informação, acolhimento e serviços
                        que realmente façam diferença na vida de quem vive situações de
                        vulnerabilidade, medo ou exclusão.
                    </p>
                </section>

                <section className={styles.storySection}>
                    <div className={styles.storyText}>
                        <span className={styles.sectionLabel}>Nossa história</span>
                        <h2>Um projeto pensado para quem muitas vezes não sabe por onde começar.</h2>
                        <p>
                            Em um cenário em que muitas pessoas ainda encontram dificuldade para
                            denunciar violência, localizar apoio próximo, entender seus direitos e
                            acessar conteúdos educativos, percebemos que a tecnologia poderia ser uma
                            ferramenta de transformação social.
                        </p>
                        <p>
                            O Equitá foi criado para reduzir essa distância. Queremos oferecer um
                            lugar em que a pessoa possa encontrar orientação clara, recursos confiáveis
                            e caminhos de ação sem precisar enfrentar barreiras de informação, medo ou
                            desorganização.
                        </p>
                    </div>

                    <div className={styles.storyPanel}>
                        <div className={styles.storyStat}>
                            <strong>1</strong>
                            <span>lugar de acolhimento</span>
                        </div>
                        <div className={styles.storyStat}>
                            <strong>2</strong>
                            <span>acesso à informação</span>
                        </div>
                        <div className={styles.storyStat}>
                            <strong>3</strong>
                            <span>caminho para ação</span>
                        </div>
                    </div>
                </section>

                <section className={styles.missionSection}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionLabel}>Propósito</span>
                        <h2>O que nos move</h2>
                    </div>

                    <div className={styles.missionGrid}>
                        <div className={styles.missionCard}>
                            <h3>🎯 Missão</h3>
                            <p>
                                Promover acesso à informação, cidadania e proteção por meio de uma
                                plataforma acessível, acolhedora e funcional.
                            </p>
                        </div>

                        <div className={styles.missionCard}>
                            <h3>👁️ Visão</h3>
                            <p>
                                Ser uma referência em tecnologia social para fortalecer direitos,
                                reduzir vulnerabilidades e aproximar pessoas de suporte real.
                            </p>
                        </div>

                        <div className={styles.missionCard}>
                            <h3>💙 Valores</h3>
                            <ul>
                                <li>Respeito às histórias e às vulnerabilidades</li>
                                <li>Inclusão de todos os públicos</li>
                                <li>Segurança e confidencialidade</li>
                                <li>Transparência e empatia</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={styles.impactSection}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionLabel}>O problema</span>
                        <h2>O que queremos transformar</h2>
                    </div>

                    <div className={styles.impactGrid}>
                        <div className={styles.impactCard}>
                            <span className={styles.impactIcon}>🚨</span>
                            <h3>Falta de segurança para denunciar</h3>
                            <p>
                                Muitas pessoas não denunciam por medo, insegurança ou porque não
                                sabem a quem recorrer.
                            </p>
                        </div>

                        <div className={styles.impactCard}>
                            <span className={styles.impactIcon}>📍</span>
                            <h3>Serviços espalhados e pouco acessíveis</h3>
                            <p>
                                A busca por apoio muitas vezes exige muita navegação e pouca clareza.
                            </p>
                        </div>

                        <div className={styles.impactCard}>
                            <span className={styles.impactIcon}>📚</span>
                            <h3>Desinformação e pouca orientação</h3>
                            <p>
                                Nem todas as pessoas conhecem seus direitos ou os caminhos para agir.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.journeySection}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionLabel}>Como pensamos</span>
                        <h2>Nosso caminho de solução</h2>
                    </div>

                    <div className={styles.journeyGrid}>
                        <div className={styles.journeyCard}>
                            <span>01</span>
                            <h3>Conectar</h3>
                            <p>
                                Unimos informação, acolhimento e serviços em uma única plataforma,
                                tornando o acesso mais simples e direto.
                            </p>
                        </div>

                        <div className={styles.journeyCard}>
                            <span>02</span>
                            <h3>Educar</h3>
                            <p>
                                Oportunizamos conteúdos que ajudam a entender direitos, prevenção,
                                cidadania e suporte emocional.
                            </p>
                        </div>

                        <div className={styles.journeyCard}>
                            <span>03</span>
                            <h3>Empoderar</h3>
                            <p>
                                A partir do acesso à informação e de conexões reais, a pessoa ganha
                                confiança para agir com segurança.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.servicesSection}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionLabel}>O que oferecemos</span>
                        <h2>Ferramentas para cuidado, informação e cidadania</h2>
                    </div>

                    <div className={styles.servicesGrid}>
                        <div className={styles.serviceCard}>
                            <span>🚨</span>
                            <h3>Canal de denúncias</h3>
                            <p>
                                Registro seguro de ocorrências com atenção à privacidade e ao acolhimento.
                            </p>
                        </div>

                        <div className={styles.serviceCard}>
                            <span>📍</span>
                            <h3>Recursos de apoio</h3>
                            <p>
                                Mapa e busca por instituições próximas, como ONGs, hospitais, defensoria e serviços sociais.
                            </p>
                        </div>

                        <div className={styles.serviceCard}>
                            <span>📚</span>
                            <h3>Guia de direitos</h3>
                            <p>
                                Conteúdos em linguagem acessível para orientar pessoas sobre seus direitos e caminhos de ajuda.
                            </p>
                        </div>

                        <div className={styles.serviceCard}>
                            <span>🎓</span>
                            <h3>Cursos educativos</h3>
                            <p>
                                Espaço de aprendizagem para fortalecer conhecimento, empatia e participação cidadã.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.odsSection}>
                    <div className={styles.odsCard}>
                        <span className={styles.sectionLabelLight}>ODS 16</span>
                        <h2>Paz, justiça e instituições eficazes</h2>
                        <p>
                            O Equitá está alinhado ao Objetivo de Desenvolvimento Sustentável 16 da
                            Agenda 2030 da ONU, reforçando a ideia de que paz, justiça, acesso à
                            informação e instituições eficazes são pilares fundamentais para uma
                            sociedade mais segura e inclusiva.
                        </p>
                    </div>
                </section>

                <section className={styles.teamSection}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionLabel}>Equipe</span>
                        <h2>Quem está por trás dessa ideia</h2>
                    </div>

                    <div className={styles.teamCard}>
                        <ul>
                            <li>João Marcos de Aguiar Gonçalves dos Santos</li>
                            <li>Maria Eduarda Carvalho da Silva</li>
                            <li>Maria Eduarda Silva Fernandes</li>
                            <li>Maria Eduarda Tenorio Turquete</li>
                            <li>Sophia Santos Gaspar</li>
                        </ul>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Sobre;