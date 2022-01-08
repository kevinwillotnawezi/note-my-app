import '../../assets/styles/index.css';
import styled from 'styled-components';
import colors from '../../assets/styles/colors';

const possibleValues = [1, 2, 3, 4, 5];

const GroupButton = styled.div`
	display: flex;
	align-items: center;

	input[type='radio'] {
		position: absolute;
		visibility: hidden;
	}

	label {
		background-color: ${colors.secondary};
		border: 1px solid ${colors.dark};
		color: ${colors.dark};
		padding: 10px 24px;
		cursor: pointer;

		@media (max-width: 588px) {
			padding: 10px 10px;
		}
		@media (max-width: 425px) {
			padding: 6px 6px;
		}
	}

	label:not(#label1) {
		border-left: none;
	}

	label:hover {
		background-color: ${colors.green};
		color: white;
	}

	input[type='radio']:checked + label {
		background-color: ${colors.green} !important;
		color: white !important;
	}
`;

function ButtonGroup({ register }) {
	return (
		<div className='container'>
			<GroupButton>
				<span>Bad</span>
				<div className='btn-group'>
					{possibleValues.map((value) => (
						<span name={'radio' + value} key={value}>
							<input data-testid={'radio' + value} {...register('rating', { required: true })} type='radio' value={value} id={'radio' + value} />
							<label htmlFor={'radio' + value} id={'label' + value}>
								{value}
							</label>
						</span>
					))}
				</div>
				<span>Good</span>
			</GroupButton>
		</div>
	);
}

export default ButtonGroup;
