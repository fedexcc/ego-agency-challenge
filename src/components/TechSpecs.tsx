import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import modelService, { ModelDetail } from '../services/modelService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
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
      <div className="model-hero">
        <div className="model-image">
          <img src={modelDetails.photo} alt={modelDetails.name} />
        </div>
        <div className="model-content">
          <p className="model-name">{modelDetails.name}</p>
          <h1 className="model-title">{modelDetails.title}</h1>
          <div className="model-description" dangerouslySetInnerHTML={{ __html: modelDetails.description }} />
        </div>
      </div>

      <div className="features-section">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={{
            clickable: true,
            type: 'bullets',
            horizontalClass: 'swiper-pagination-features',
            renderBullet: function (index, className) {
              return `<span class="${className}"></span>`;
            }
          }}
          loop={true}
          slidesPerGroup={1}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 24,
              centeredSlides: true
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
              centeredSlides: false,
              initialSlide: 0
            }
          }}
          className="features-swiper"
        >
          {modelDetails.model_features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="feature-card">
                <div className="feature-image">
                  <img src={feature.image} alt={feature.name} />
                </div>
                <h3>{feature.name}</h3>
                <p>{feature.description}</p>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination-features"></div>
        </Swiper>
      </div>

      <div className="highlights-section">
        <div className="highlights-grid">
          {modelDetails.model_highlights.map((highlight, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-content">
                <h3>{highlight.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: highlight.content }} />
              </div>
              <div className="highlight-image">
                <img src={highlight.image} alt={highlight.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechSpecs; 