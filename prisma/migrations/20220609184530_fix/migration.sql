-- CreateIndex
CREATE INDEX "Cart_Item_userId_idx" ON "Cart_Item"("userId");

-- CreateIndex
CREATE INDEX "Review_itemId_userId_idx" ON "Review"("itemId", "userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
