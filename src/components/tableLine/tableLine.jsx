function TableLine({ data, isHeader, label }) {
	const tableClass = isHeader ? 'table-header' : 'table-row';

	return (
		<li data-testid='li' className={tableClass}>
			{data.map((cellValue, index) => (
				<div key={index} className={'col col-' + index} data-label={label ? label[index] : ''}>
					{cellValue}
				</div>
			))}
		</li>
	);
}
export default TableLine;
