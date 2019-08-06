import * as React from 'react';
import styles from './Table.module.scss';
import CurrencyFormat from 'react-currency-format';

export default (class Table extends React.PureComponent {
	
	render() {
		const { headers, data } = this.props;
		console.log('TCL: fetchData -> response data table', data);
		return (
			<div className={styles.main}>
				<table className={styles.table}>
					<thead className={styles.mainHeader}>
						<tr className={styles.header}>
							{headers.map((header, i) => {
								return (
									<th key={i} className={styles.header_item}>
										{header}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className={styles.body}>
						
							{data.map((dato, i) => {
								return(		
									<tr className={styles.row}>
										<td className={styles.row_item}>{data[i].name}</td>
										<td className={styles.row_item}>{data[i].temp && data[i].temp}</td>
										<td className={styles.row_item}>{data[i].humidity && data[i].humidity}</td>
										<td className={styles.row_item}>{data[i].pressure && data[i].pressure}</td>
									</tr>	
								);	
							})}
					
					</tbody>
				</table>
			</div>
		);
	}
});
