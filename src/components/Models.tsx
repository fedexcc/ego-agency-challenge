import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterSection from './FilterSection';
import Button from './Button';
import modelService, { ModelBasic } from '../services/modelService';
import '../styles/Models.scss';

const Models: React.FC = () => {
    const navigate = useNavigate();
    const [models, setModels] = useState<ModelBasic[]>([]);
    const [filteredModels, setFilteredModels] = useState<ModelBasic[]>([]);
    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const [selectedOrder, setSelectedOrder] = useState('Nada');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [availableSegments, setAvailableSegments] = useState<string[]>(['Todos']);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const data = await modelService.getAllModels();
                setModels(data);
                setFilteredModels(data);
                // Extraer segmentos únicos y agregar 'Todos'
                const segments = ['Todos', ...new Set(data.map(model => model.segment))];
                setAvailableSegments(segments);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching models:', err);
                setError('Error al cargar los modelos');
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    useEffect(() => {
        let result = [...models];
        
        // Aplicar filtro por segmento
        if (selectedFilter !== 'Todos') {
            result = result.filter(model => model.segment === selectedFilter);
        }

        // Aplicar ordenamiento
        const orderText = selectedOrder.toString();
        switch (orderText) {
            case 'De menor a mayor precio':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'De mayor a menor precio':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'Más nuevos primero':
                result.sort((a, b) => b.year - a.year);
                break;
            case 'Más viejos primero':
                result.sort((a, b) => a.year - b.year);
                break;
            default: // 'Nada'
                // No aplicamos ningún ordenamiento
                break;
        }

        setFilteredModels(result);
    }, [selectedFilter, selectedOrder, models]);

    const handleModelClick = (modelId: number) => {
        navigate(`/modelos/ficha-tecnica/${modelId}`);
    };

    if (loading) return <div className="loading">Cargando modelos...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="models-container">
            <h1>Descubrí todos los modelos</h1>
            <FilterSection 
                onFilterChange={setSelectedFilter} 
                selectedFilter={selectedFilter}
                filterOptions={availableSegments}
                selectedOrder={selectedOrder}
                onOrderChange={setSelectedOrder}
            />
            <div className="models-grid">
                {filteredModels.map((model) => (
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
                            <div className="model-image">
                                <img src={model.thumbnail} alt={model.name} />
                            </div>
                        </div>
                        <div className="button-container">
                            <Button
                                variant="inverted"
                                onClick={(e) => {
                                    e.stopPropagation();
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