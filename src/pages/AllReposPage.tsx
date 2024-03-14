import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Repository } from '../interfaces/Repository.interface';
import styles from '../styles/AllReposPage.module.css';

const AllRepos = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get('https://api.github.com/users/PedroSales117/repos');
                setRepositories(response.data);
            } catch (error) {
                console.error('Erro ao buscar repositórios:', error);
            }
        };

        fetchRepos();
    });

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
                <button onClick={() => navigate('/')} className={styles.homeButton}>Home</button>
            </div>
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
