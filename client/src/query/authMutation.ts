

import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { LoginCredentials , RegisterCredentials} from "@/types/auth";
import { loginUser, registerUser } from "@/lib/api/authApi";
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