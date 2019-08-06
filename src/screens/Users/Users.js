import * as React from 'react';
import styles from './Users.module.scss';
import WebServices from '../../WebServices/WebServices';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import SimpleBarChart from '../../components/Chart/SimpleBarChart';

export default (class Users extends React.PureComponent {
	state = {
		response: {},
		url: "",
		urlName:'http://api.openweathermap.org/data/2.5/weather?q=London&appid=d0b76fd83718eef1932b224506cfb48f',
		urlId:'http://api.openweathermap.org/data/2.5/weather?id=708546&appid=d0b76fd83718eef1932b224506cfb48f',
		urlCoor:'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d0b76fd83718eef1932b224506cfb48f',
		data:[],
		data2:[],
		headerss: ['CITY','TEMP','HUMIDITY','PRESSURE']
	};

	componentDidMount() {
		
	}

	init = () => {
		const {data} = this.state;
		let array = [];
		data.forEach((item, i) => {
			const element = {
				name:data[i].name,
				temp: data[i].main.temp,
				humidity: data[i].main.humidity,
				pressure: data[i].main.pressure
			};
			array = array.concat(element);
		});
		console.log('array',array);
		this.setState({data2:array});
	};

	fetchData = async (urlCity) => {
		try {
			const response = await WebServices.getWeather({
				urlCity
			});
			this.setState({ response: response});
			
		} catch (e) {}
	};

	onInputChange = (event) => {
		const value = event.target.value;
		this.setState({url:value});
		try {
			this.fetchData(value);
		} catch (e) {
		}
	};

	onButtonClickAdd = (event) => {
		const {data,response,url} = this.state;
		data.push(response);
		this.setState({data:data});
		this.fetchData(url);
		this.init();
	};

	onClickOption = (url) => {
		this.setState({url:url});
		this.fetchData(url);
	};

	render() {
		
		const { response, url, data2,headerss,urlName,urlId,urlCoor } = this.state;
		return (
			<div className={styles.main}>
	
				<div className={styles.contenedor}>
					<Input type="text" className={styles.input} value={url} onChange={(event) => this.onInputChange(event)} />
					<Button type={'other'} className={styles.button} label={"New"} onClick={() => this.onButtonClickAdd()}/>	
				</div>	
				<div className={styles.info}>
					<ul>
						<li onClick={(event) => this.onClickOption(urlName)}> CITY NAME</li>
						<li onClick={(event) => this.onClickOption(urlId)}>CITY ID</li>
						<li onClick={(event) => this.onClickOption(urlCoor)}>COORDENADES</li>
					</ul>
					<ul>
						<li>NAME:{response && response.name}</li>
						<li>TEMP:{response && response.main && response.main.temp}</li>
						<li>HUMIDITY:{response && response.main && response.main.humidity}</li>
						<li>PRESSURE:{response && response.main && response.main.pressure}</li>
					</ul>
				</div>
				<div className={styles.info}>
					<Table data={data2} headers={headerss} />
					<SimpleBarChart data={data2} x={'name'} y1={'temp'} y2={'humidity'} y3={'pressure'} y1Axis={'left'} y2Axis={'right'} y3Axis={'right'} />
				</div>
			</div>
		);
	}
});
