

import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { LoginCredentials , RegisterCredentials, VerifyEmailCredentials, VerifyOTPCredentials} from "@/types/auth";
import { loginUser, registerUser, VerifyEmail, verifyOTP } from "@/lib/api/authApi";
import {action} from '@/redux/slice/authSlice'
import { error } from "console";
import { parseDjangoError } from "@/lib/utils";


export const useLoginMutation = () => {
      const dispatch = useAppDispatch();
      const router = useRouter();
      return useMutation({
            mutationKey: ["login"],
            mutationFn : (credentials : LoginCredentials) =>loginUser(credentials),
            onSuccess : (data) => {
                  dispatch(action.setAuth(data))
                  router.replace("/")
            },
            
      })
}
export const useRegisterMutation = () => {
      const router = useRouter();
      return useMutation({
            mutationKey: ["register"],
            mutationFn : (credentials :RegisterCredentials ) =>registerUser(credentials),
            onSuccess : (data) => {
                  router.replace("/login")
            }
      })
}

export const useVerifyEmailMutation = () => {
      const dispatch = useAppDispatch();
      const router = useRouter();
      return useMutation({
            mutationKey: ["verifyEmail"],
            mutationFn : (credentials :VerifyEmailCredentials ) =>VerifyEmail(credentials),
      })
}

export const useVerifyOTPMutation =()=>{
      const email = useAppSelector(state => state.auth.email);
      const router = useRouter();
      return useMutation({
            mutationKey : ["verifyOTP"],
            mutationFn : async ({code} :{code : number}) => verifyOTP({email, code})
      })
}