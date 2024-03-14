import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Repository } from '../interfaces/Repository.interface';
import styles from '../styles/AllReposPage.module.css';

const AllRepos = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [mainRepo, setMainRepo] = useState<Repository | undefined>(undefined);
    const [hubRepo, setHubRepo] = useState<Repository | undefined>(undefined); // Adicionado para armazenar o hubRepo
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response: AxiosResponse<Repository[], any> = await axios.get('https://api.github.com/users/PedroSales117/repos');
                const data = response.data;
                const foundHubRepo = data.find(repo => repo.topics.includes('hub'));
                const foundMainRepo = data.find(repo => repo.topics.includes('main'));
                const projectRepos = data.filter(repo => !repo.topics.includes('main') && !repo.topics.includes('hub'));

                setRepositories(projectRepos);
                setMainRepo(foundMainRepo);
                setHubRepo(foundHubRepo);
            } catch (error) {
                console.error('Erro ao buscar repositórios:', error);
            }
        };

        fetchRepos();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.textBackground}>
                PEDROSALES117
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.leftButtons}>
                    <button onClick={() => navigate('/ai')} className={styles.button}>
                        {'Artificial Intelligence'}
                    </button>
                    <span className={styles.separator}>_</span>
                    <button onClick={() => navigate('/backend')} className={styles.button}>
                        {'Back End'}
                    </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {hubRepo && (
                        <a className={styles.linkButton} href={hubRepo.html_url} target="_blank" rel="noopener noreferrer">hub Repository</a>
                    )}
                    <button onClick={() => navigate('/')} className={styles.homeButton}>Home</button>
                </div>
            </div>
            {mainRepo && (
                <div className={styles.mainRepoBanner}>
                    <a className={styles.mainRepoBannerButton} href={mainRepo.html_url} target="_blank" rel="noopener noreferrer">{mainRepo.name}</a>
                </div>
            )}
            <div className={styles.grid}>
                {repositories.map(repo => (
                    <div key={repo.id} className={styles.repoCard}>
                        <h3>{repo.name}</h3>
                        <p>{repo.description || 'Sem descrição'}</p>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>acessar</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllRepos;
