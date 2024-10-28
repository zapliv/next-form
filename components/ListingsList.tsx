import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Select } from 'antd';
import { deleteListing } from '@/store/listingsSlice';

const { Option } = Select;

const ListingsList: React.FC = () => {
    const listings = useSelector((state: any) => state.listings.listings);
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null);
    const [filterType, setFilterType] = useState<string | null>(null);

    // Функция для сортировки по дате
    const sortedListings = [...listings].sort((a, b) => {
        if (sortOrder === 'ascend') {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else if (sortOrder === 'descend') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
    });

    // Фильтрация по типу "Объявление" или "Аукцион"
    const filteredListings = filterType
        ? sortedListings.filter(listing => listing.type === filterType)
        : sortedListings;

    const columns = [
        { title: 'Название', dataIndex: 'title', key: 'title' },
        { title: 'Категория', dataIndex: 'category', key: 'category' },
        { title: 'Доп. Категория', dataIndex: 'subcategory', key: 'subcategory' },
        { title: 'Состояние', dataIndex: 'condition', key: 'condition' },
        { title: 'Производитель', dataIndex: 'manufacturer', key: 'manufacturer' },
        { title: 'Тип', dataIndex: 'type', key: 'type' },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true, // Сортировка по дате
            render: (text: string) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_: any, record: any) => (
                <Button onClick={() => dispatch(deleteListing(record.id))}>Удалить</Button>
            ),
        },
    ];

    // Обработчик изменения порядка сортировки
    const handleSortChange = (value: string) => {
        setSortOrder(value === 'ascend' ? 'ascend' : 'descend');
    };

    // Обработчик изменения фильтра типа
    const handleFilterTypeChange = (value: string) => {
        setFilterType(value === 'all' ? null : value);
    };

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Select
                    defaultValue="Сортировать по"
                    style={{ width: 180, marginRight: 10 }}
                    onChange={handleSortChange}
                >
                    <Option value="ascend">Сначала старые</Option>
                    <Option value="descend">Сначала новые</Option>
                </Select>

                <Select
                    defaultValue="Фильтр по типу"
                    style={{ width: 180 }}
                    onChange={handleFilterTypeChange}
                >
                    <Option value="all">Все</Option>
                    <Option value="Объявление">Объявление</Option>
                    <Option value="Аукцион">Аукцион</Option>
                </Select>
            </div>

            <Table dataSource={filteredListings} columns={columns} rowKey="id" />
        </div>
    );
};

export default ListingsList;
