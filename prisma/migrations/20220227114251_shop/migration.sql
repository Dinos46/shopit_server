-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "image" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
