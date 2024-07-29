
function Login(){

    return(
        <div className=" h-screen bg-HRMSRed">
            <div className=" flex justify-between">
                <p className=" text-HRMSBeige p-5 text-3xl font-RobotoMono">Arbin <br />Instruments</p>
                <p className=" text-HRMSBeige p-5 text-3xl font-RobotoMono">HRMS</p>
            </div>
            <div className=" flex flex-col justify-center items-center text-HRMSBeige">
                <p className=" font-Bungee text-HRMSBeige text-9xl m-9 p-10">WELCOME</p>
                <input name="email id" placeholder="email id" className=" placeholder:text-gray-500 placeholder:text-xl placeholder:p-1 pb-1 text-HRMSBlack bg-HRMSBeige m-4 text-2xl rounded-md"/>
                <input name="password" placeholder="password" className=" placeholder:text-gray-500 placeholder:text-xl placeholder:p-1 pb-1 text-HRMSBlack bg-HRMSBeige m-4 text-2xl rounded-md"/>
                <button type="submit" className=" bg-HRMSBeige text-HRMSBlack text-2xl p-2 rounded-md hover:bg-HRMSBlack hover:text-HRMSBeige">LOGIN</button>
            </div>
            <div className=" w-[18%] h-[18%]">
                <img src="../src/assets/loginimg.png" />
            </div>
        </div>
    )
}

export default Login