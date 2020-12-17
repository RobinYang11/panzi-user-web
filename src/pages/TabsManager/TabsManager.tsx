import { Col, Row, Tabs } from 'antd'
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react'
import { queryType } from '../../api/api';
import Defect from '../Defect/Defect';
import './TabsManager.less'

const { TabPane } = Tabs;


export default (props: any) => {

	const [type, setType] = useState<Array<IType>>([]);
	const [active, setActive] = useState('all');

	function callback(key: any) {
		setActive(key);
	}

	useEffect(() => {
		onQueryType();
	}, [])

	const onQueryType = () => {
		queryType({}).then((res: any) => {
			console.log(res.result);
			setType(res.result);
		})
	}

	return (
		<div>
			<Tabs activeKey={active} onChange={callback}>
				<TabPane tab={"全部"} key={'all'}>
					<Defect type={''} />
				</TabPane>
				{
					type?.map((item) => {
						return <TabPane tab={item.name} key={item.name}>
							<Defect type={item.name} />
						</TabPane>
					})
				}
			</Tabs>
		</div>

	)

}