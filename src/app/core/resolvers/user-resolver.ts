import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserRepositoryServices } from '@data/repositories/user-repository';
import { Usermodel } from '@models/usermodel';

export const userResolver: ResolveFn<Usermodel | null> = async (route, state) => {
  const userRepo = inject(UserRepositoryServices);
  const userId = route.paramMap.get('id')!;
  let userData = null;
  await userRepo.getUser(userId).then(result => {
    userData = result
  });
  return userData;
};

export const userListResolver: ResolveFn<Usermodel[] | null> = async (route, state) => {
  const userRepo = inject(UserRepositoryServices);
  let userDataList = null;
  await userRepo.getAllUsers().then(result => {
    userDataList = result
  });
  return userDataList;
};

