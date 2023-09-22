import { Transfer } from 'antd';
import { useState } from 'react';
import './Footer_update_owner.css';

const mockData = [{ key: '0', title: 'Garage ABC', description: 'description of content1' },
{ key: '1', title: 'TLS', description: 'description of content2' },
{ key: '2', title: 'AHC', description: 'description of content3' },
{ key: '3', title: 'CB Garage', description: 'description of content4' },
{ key: '4', title: 'UCQ', description: 'description of content5' },];

const oriTargetKeys = mockData.filter((item) => Number(item.key) % 3 > 1).map((item) => item.key);

const Footer_update_owner = () => {
    const [targetKeys, setTargetKeys] = useState(oriTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
    };

    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        // If any source items are selected, add them to the target list
        if (sourceSelectedKeys.length > 0) {
            const newTargetKeys = [...targetKeys, ...sourceSelectedKeys];
            setTargetKeys(newTargetKeys);
            setSelectedKeys([]);
        }

        // If any target items are selected, remove them from the target list
        if (targetSelectedKeys.length > 0) {
            const newTargetKeys = targetKeys.filter((key) => !targetSelectedKeys.includes(key));
            setTargetKeys(newTargetKeys);
            setSelectedKeys([]);
        }
    };

    const handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };

    const handleSearch = (direction, value) => {
        setSearchText(value);
    };

    const filteredData = mockData.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
        <>
            <h2>Garage</h2>
            <Transfer className='Footer_update_owner'

                showSearch={{
                    filterOption: false,
                    render: (props) => <input {...props} placeholder="Search..." />
                }}
                dataSource={filteredData}
                titles={['Source', 'Target']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                onScroll={handleScroll}
                operation={[]}
                render={(item) => item.title}
                oneWay
                style={{
                    marginBottom: 16,
                }}
                onSearch={handleSearch}
            />
            
        </>
    );
};

export default Footer_update_owner;



