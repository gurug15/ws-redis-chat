

const GenderCheckbox = ({selectedGender,onCheckBoxChange}:{selectedGender: string, onCheckBoxChange:(gender:"male" | "female")=>void}) => {

	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input
					      checked={selectedGender == "male"}
						  onChange={()=>onCheckBoxChange("male")}
					      type='checkbox' className='checkbox border-slate-900' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input
					      checked={selectedGender=="female"}
						  onChange={()=>onCheckBoxChange("female")}  
					      type='checkbox' className='checkbox border-slate-900' />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;