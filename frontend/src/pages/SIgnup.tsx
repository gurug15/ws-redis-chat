import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderChange";
import { useState } from "react";
import { SignupInputType } from "../lib/types";
import { useSignup } from "../hooks/useSignup";



const SignUp = () => {
   const [inputs,setInputs] = useState<SignupInputType>({
	username: "",
	fullName: "",
	password: "",
	confirmPassword: "",
	gender: ""
	})

	const { isLoading,signup } = useSignup();
 

	const handleGenderChange = (gender: "male" | "female" )=>{
         setInputs({...inputs,gender:gender})
	}

	const handleSubmitForm = (e: React.FormEvent)=>{
       e.preventDefault()
       signup(inputs)
	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input onChange={e=>setInputs({...inputs,fullName:e.target.value})} type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input onChange={e=>setInputs({...inputs,username:e.target.value})} type='text' placeholder='johndoe@mail.com' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
						    onChange={e=>setInputs({...inputs,password:e.target.value})}
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
						    onChange={e=>setInputs({...inputs,confirmPassword:e.target.value})}
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
						/>
					</div>

					<GenderCheckbox selectedGender={inputs.gender} onCheckBoxChange={handleGenderChange} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
					>
						Already have an account?
					</Link>

					<div>
						<button disabled={isLoading} onClick={handleSubmitForm} className='btn btn-block btn-sm mt-2 border border-slate-700'>{isLoading?"isLoading...":"Sign Up"}</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;