import {Router} from "express";
import { APIContext } from "application/config/APIWrapper";
import { OnboardingController } from "application/controller/OnboardingController";

export const router = Router();

router.post('/signup', APIContext({
    controller: OnboardingController.createCustomer, 
    requireAuth: false
  }))
