import React, {useState} from 'react';
import {Form, Input, Select, Button, Row, Col, message} from 'antd';
import {useDispatch} from 'react-redux';
import {addListing} from '@/store/listingsSlice';
import styles from './ListingForm.module.scss'; // Используем SCSS для тонкой настройки стилей

const { Option } = Select;
const {TextArea} = Input;

const categories = [
    {
        label: 'Отечественные автомобили',
        value: 'Отечественные автомобили',
        subcategories: ['Раритетные и редкие модели', 'Современные модели'],
    },
    {
        label: 'Электроника',
        value: 'Электроника',
        subcategories: ['Смартфоны', 'Ноутбуки'],
    },
    {
        label: 'Книги',
        value: 'Книги'
    }, // Без подкатегорий
];

const ListingForm: React.FC = () => {
    const [type, setType] = useState<string>('Объявление');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [condition, setCondition] = useState<string>('Новый');
    const dispatch = useDispatch();

    const handleFormSubmit = (values: any) => {
        const newListing = {
            ...values,
            condition, // Добавляем состояние в лот
            id: Date.now(),
            type,
            createdAt: new Date().toISOString(),
        };

        dispatch(addListing(newListing));
        message.success('Лот успешно создан!');
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };


    return (
        <div className={styles.formContainer}>
                <div className={styles.buttonGroup}>
                    <Button
                        type={type === 'Аукцион' ? 'primary' : 'default'}
                        onClick={() => setType('Аукцион')}
                        className={type === 'Аукцион' ? styles.activeButton : ''}
                    >
                        Аукцион
                    </Button>
                    <Button
                        type={type === 'Объявление' ? 'primary' : 'default'}
                        onClick={() => setType('Объявление')}
                        className={type === 'Объявление' ? styles.activeButton : ''}
                    >
                        Объявление
                    </Button>
            </div>
            <Form onFinish={handleFormSubmit} layout="vertical">
                <div className={styles.section}>
                </div>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="category"
                            label="Категория"
                            rules={[{required: true, message: 'Выберите категорию'}]}
                        >
                            <Select onChange={handleCategoryChange} placeholder="Выберите категорию">
                                {categories.map(cat => (
                                    <Option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {selectedCategory && categories.find(cat => cat.value === selectedCategory)?.subcategories && (
                            <Form.Item
                                name="subcategory"
                                label="Дополнительная категория"
                                rules={[{required: true, message: 'Выберите дополнительную категорию'}]}
                            >
                                <Select placeholder="Выберите дополнительную категорию">
                                    {categories
                                        .find(cat => cat.value === selectedCategory)

                                        ?.subcategories?.map(sub => (
                                            <Option key={sub} value={sub}>
                                                {sub}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        )}
                    </Col>
                </Row>
                <Form.Item name="title" label="Название лота"
                           rules={[{required: true, message: 'Введите название'}]}>
                    <Input/>
                </Form.Item>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item name="sku" label="Артикул"><Input/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="condition" label="Состояние" initialValue="Новый"
                                   rules={[{required: true, message: 'Выберите состояние'}]}>

                                <Button
                                    type={condition === 'Новый' ? 'primary' : 'default'}
                                    onClick={() => setCondition('Новый')}
                                >
                                    Новый
                                </Button>
                                <Button
                                    type={condition === 'Б/у' ? 'primary' : 'default'}
                                    onClick={() => setCondition('Б/у')}
                                >
                                    Б/у
                                </Button>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="manufacturer" label="Производитель"
                                   rules={[{required: true, message: 'Выберите производителя'}]}>
                            <Select>
                                <Option value="Traxxas">Traxxas</Option>
                                <Option value="LD R/C">LD R/C</Option>
                                <Option value="WLToys">WLToys</Option>
                                <Option value="Другой производитель">Другой производитель</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item name="scale" label="Масштаб"
                                   rules={[{required: true, message: 'Выберите масштаб'}]}>
                            <Select>
                                <Option value="1:8">1:8</Option>
                                <Option value="1:10">1:10</Option>
                                <Option value="1:25">1:25</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Form.Item name="material" label="Материал">
                            <Select>
                                <Option value="Пластик">Пластик</Option>
                                <Option value="Металл">Металл</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="description" label="Описание"
                           rules={[{required: true, message: 'Заполните описание'}]}>
                    <TextArea rows={4}/>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Опубликовать лот
                </Button>
            </Form>
        </div>
    );
};
export default ListingForm;