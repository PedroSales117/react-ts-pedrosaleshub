import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Repository } from '../interfaces/Repository.interface';
import styles from '../styles/ListRepositories.module.css';

const ListRepos = ({ filter }: { filter: string }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const navigate = useNavigate();

  const filterInfos = {
    title: filter === 'ai' ? 'Back-end' : 'Artificial Intelligence',
    route: filter === 'ai' ? '/backend' : '/ai'
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/PedroSales117/repos');
        const filteredRepos = response.data.filter((repo: Repository) => repo.topics.includes(filter));
        setRepositories(filteredRepos);
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
      }
    };

    fetchRepos();
  }, [filter]);

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        {/* Botão Back-end/Artificial Intelligence */}
        <button onClick={() => navigate(filterInfos.route)} className={styles.button}>
          {filterInfos.title}
        </button>
        
        {/* Container para os botões "All Public Projects" e "Home" */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate('/all')} className={styles.linkButton}>
            All Public Projects
          </button>
          <button onClick={() => navigate('/')} className={styles.homeButton}>
            Home
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        {repositories.map(repo => (
          <div key={repo.id} className={styles.repoCard}>
            <h3>{repo.name}</h3>
            <p>{repo.description || 'Sem descrição'}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
              acessar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRepos;
