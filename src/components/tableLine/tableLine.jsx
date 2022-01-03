function TableLine({ data, isHeader }) {
	const tableClass = isHeader ? 'table-header' : 'table-row';

	return (
		<li data-testid='li' className={tableClass}>
			{data.map((cellValue, index) => (
				<div key={index} className={'col col-' + index}>
					{cellValue}
				</div>
			))}
		</li>
	);
}
export default TableLine;
