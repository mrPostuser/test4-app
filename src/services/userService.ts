import prisma from '../prisma';

// Creating a new user
export async function createUser(email: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      password, // the password must be hashed before calling this function
    },
  });
}

// Getting all users
export async function getAllUsers() {
  return prisma.user.findMany();
}

// Search for a user by email
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Updating User Profile Data
export async function updateUserProfile(userId: number, email: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { email },
  });
}

// Adding a function to update the user role
export async function updateUserRole(userId: number, role: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
  });
}

// Deleting a user
export async function deleteUser(userId: number) {
  return prisma.user.delete({
    where: { id: userId },
  });
}

// Removing a role (nullifying a user's role)
export async function removeUserRole(userId: number) {
  return prisma.user.update({
    where: { id: userId },
    data: { role: 'user' },  // If we delete a role, the default is user
  });
}