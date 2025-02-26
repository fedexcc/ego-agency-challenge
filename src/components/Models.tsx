import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterSection from './FilterSection';
import Button from './Button';
import modelService, { ModelBasic } from '../services/modelService';
import '../styles/Models.scss';

const Models: React.FC = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState<ModelBasic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await modelService.getAllModels();
        setModels(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching models:', err);
        setError('Error al cargar los modelos');
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const handleModelClick = (modelId: number) => {
    navigate(`/modelos/ficha-tecnica/${modelId}`);
  };

  if (loading) return <div className="loading">Cargando modelos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="models-container">
      <h1>Descubrí todos los modelos</h1>
      <FilterSection />
      <div className="models-grid">
        {models.map((model) => (
          <div 
            key={model.id} 
            className="model-card"
            onClick={(e) => {
              // Solo navegamos si estamos en mobile
              if (window.innerWidth <= 768) {
                e.preventDefault();
                handleModelClick(model.id);
              }
            }}
          >
            <div className="model-image">
              <img src={model.thumbnail} alt={model.name} />
            </div>
            <h3 className="model-name">{model.name}</h3>
            <div className="model-info">
              <div className="model-details">
                <span className="model-year">{model.year}</span>
                <span className="separator">|</span>
                <span className="model-price">
                  {new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                    maximumFractionDigits: 0
                  }).format(model.price)}
                </span>
              </div>
            </div>
            <div className="button-container">
              <Button 
                variant="inverted" 
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el click se propague al contenedor
                  handleModelClick(model.id);
                }}
              >
                Ver Modelo
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Models; 