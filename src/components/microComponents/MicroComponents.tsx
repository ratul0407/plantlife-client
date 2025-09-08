// import { useNavigate } from "react-router";
// import { saveUser } from "../../api/utils";
// import googleIcon from "../../assets/icons/google-icon.svg";
// import { useAuth } from "../../hooks/useAuth";
// export const FormButton = ({ isSubmitting, text }) => {
//   return (
//     <button
//       disabled={isSubmitting}
//       type="submit"
//       className="min-w-full cursor-pointer rounded-sm bg-green-800 py-2.5 text-lg font-semibold text-white transition-all duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//     >
//       {text}
//     </button>
//   );
// };

// export const GoogleLogin = ({ isSubmitting }) => {
//   const navigate = useNavigate("");
//   const { signInWithGoogle } = useAuth();
//   const handleGoogleSignIn = async () => {
//     try {
//       const data = await signInWithGoogle();
//       await saveUser(data?.user);
//       console.log(data?.user);
//       navigate("/plants");
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   return (
//     <div>
//       <button
//         disabled={isSubmitting}
//         onClick={handleGoogleSignIn}
//         className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-xl py-2 text-lg font-medium shadow-sm shadow-slate-200 transition-all duration-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 lg:gap-12"
//       >
//         <img src={googleIcon} />
//         Continue with google
//       </button>
//     </div>
//   );
// };
//    <header className="sticky top-0 left-0 z-50 flex items-center justify-between bg-white px-8 py-6 shadow-sm">
//           <h3 className="font-metal text-4xl">
//             <Link to="/">PlantLife</Link>
//           </h3>
//           {/*  desktop nav */}
//           {/* menu container */}
//           <div className="flex cursor-pointer flex-row-reverse items-center gap-6 md:relative md:flex-row md:gap-8">
//             {/* menu */}
//             <div>
//               {/* menu open button for mobile */}
//               <div className="block md:hidden">
//                 {true ? (
//                   <button
//                     onClick={() => setOpenProfileBar(true)}
//                     className="flex h-8 w-8 items-center justify-center rounded-full bg-green-800 text-white"
//                   >
//                     {!isLoading && user?.name?.[0].toUpperCase()}
//                   </button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     className="cursor-pointer rounded-sm bg-slate-100 px-3 py-2 text-black shadow-xl"
//                   >
//                     Login
//                   </Link>
//                 )}

//                 {/* menu for mobile */}
//                 <div
//                   className={`absolute top-0 right-0 z-[100] min-h-screen w-60 border-l border-slate-200 bg-white shadow-sm ${openProfileBar ? "block" : "hidden"}`}
//                 >
//                   <p className="flex items-center justify-between bg-green-800 px-2 py-3 text-white">
//                     {/* Hi, {user?.displayName} */}
//                     <button onClick={() => setOpenProfileBar(false)}>
//                       <MdClose className="h-6 w-6 rounded-full border p-0.5" />
//                     </button>
//                   </p>
//                   <ul className="flex h-full flex-col bg-white text-gray-800 *:flex *:items-center *:gap-2 *:bg-white *:px-4 *:py-4">
//                     <li>
//                       <span>
//                         <BsPerson />
//                       </span>
//                       My Profile
//                     </li>
//                     <li>
//                       <BsHeart />
//                       WishList
//                     </li>
//                     <li>
//                       <BsCart />
//                       Cart
//                     </li>
//                     <li>
//                       <BsBox />
//                       orders
//                     </li>
//                     <li>
//                       <BsStar />
//                       Reviews
//                     </li>
//                     {/* <li
//                       onClick={logOut}
//                       className="absolute bottom-0 text-red-500"
//                     >
//                       <MdLogout />
//                       Log out
//                     </li> */}
//                   </ul>
//                 </div>
//               </div>
//               {/* menu for desktop */}
//               {!user ? (
//                 <Link to="/login" className="flex items-center gap-2">
//                   <User size={20} className="text-gray-500" />
//                   <p>Login</p>
//                 </Link>
//               ) : (
//                 <div
//                   onMouseEnter={() => setOpenProfileBar(true)}
//                   onMouseLeave={() => setOpenProfileBar(false)}
//                 >
//                   <Avatar>
//                     <AvatarImage src={user?.picture} />
//                     <AvatarFallback>{user?.name[0]}</AvatarFallback>
//                   </Avatar>
//                   {/* drop down for desktop */}
//                   <div
//                     className={`absolute top-6 right-0 w-44 rounded-xl bg-white py-3 shadow-xl duration-300 group-hover:block ${!openProfileBar && "hidden"}`}
//                   >
//                     <ul className="flex flex-col text-gray-800 *:flex *:items-center *:gap-2 *:px-4 *:py-2 *:hover:bg-gray-100 *:hover:text-green-800">
//                       <li>
//                         <span>
//                           <BsPerson />
//                         </span>
//                         My Profile
//                       </li>
//                       <li>
//                         <Link
//                           className="flex items-center gap-2"
//                           to="/user/wishlist"
//                         >
//                           <BsHeart />
//                           WishList
//                         </Link>
//                       </li>
//                       <li>
//                         <BsCart />
//                         Cart
//                       </li>
//                       <li>
//                         <BsBox />
//                         orders
//                       </li>
//                       <li>
//                         <BsStar />
//                         Reviews
//                       </li>
//                       <li onClick={handleLogOut} className="text-red-500">
//                         <MdLogout />
//                         Log out
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               )}
//             </div>
//             {/* cart */}

//             <div className="relative">
//               <Cart />
//             </div>
//           </div>
//         </header>
