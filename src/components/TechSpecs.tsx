import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import modelService, { ModelDetail } from '../services/modelService';
import '../styles/TechSpecs.scss';

const TechSpecs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [modelDetails, setModelDetails] = useState<ModelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModelDetails = async () => {
      if (!id) {
        setError('ID del modelo no especificado');
        setLoading(false);
        return;
      }

      const modelId = parseInt(id, 10);
      if (isNaN(modelId)) {
        setError('ID del modelo inválido');
        setLoading(false);
        return;
      }
      
      try {
        const data = await modelService.getModelById(modelId);
        setModelDetails(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching model details:', err);
        setError('Error al cargar los detalles del modelo');
        setLoading(false);
      }
    };

    fetchModelDetails();
  }, [id]);

  if (loading) return <div className="loading">Cargando detalles...</div>;
  if (error) return (
    <div className="error-container">
      <div className="error">{error}</div>
      <button onClick={() => navigate('/modelos')} className="back-button">
        Volver a modelos
      </button>
    </div>
  );
  if (!modelDetails) return <div className="error">No se encontró el modelo</div>;

  return (
    <div className="tech-specs-container">
      <div className="model-header">
        <h1>{modelDetails.name}</h1>
        <p className="model-title">{modelDetails.title}</p>
        <div className="model-description" dangerouslySetInnerHTML={{ __html: modelDetails.description }} />
      </div>

      <div className="features-section">
        <h2>Características</h2>
        <div className="features-grid">
          {modelDetails.model_features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-image">
                <img src={feature.image} alt={feature.name} />
              </div>
              <h3>{feature.name}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="highlights-section">
        <h2>Destacados</h2>
        <div className="highlights-grid">
          {modelDetails.model_highlights.map((highlight, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-image">
                <img src={highlight.image} alt={highlight.title} />
              </div>
              <h3>{highlight.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: highlight.content }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechSpecs; 