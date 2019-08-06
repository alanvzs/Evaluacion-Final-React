import * as React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Example extends React.PureComponent {
	render() {
		const { data, x, y1, y2,y3, y1Axis, y2Axis, y3Axis } = this.props;
		return (
			<BarChart
				width={700}
				height={500}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={x} />

				<YAxis yAxisId="left" />
				<YAxis yAxisId="right" orientation="right" />
				<Tooltip />
				<Legend />
				<Bar dataKey={y1} yAxisId={y1Axis} fill="#FFFF00" />
				<Bar dataKey={y2} yAxisId={y2Axis} fill="#256B7B" />
				<Bar dataKey={y3} yAxisId={y3Axis} fill="#FF8000" />
			</BarChart>
		);
	}
}
