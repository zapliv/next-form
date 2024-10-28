import React from 'react';
import ListingForm from '../components/ListingForm';
import ListingsList from '../components/ListingsList';

const Home: React.FC = () => {
    return (
        <div style={{ padding: 20 }}>
            <h1>Создание лота</h1>
            <ListingForm />
            <h2>Список лотов</h2>
            <ListingsList />
        </div>
    );
};

export default Home;
