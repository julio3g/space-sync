/*
  Warnings:

  - You are about to drop the column `url` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamNameUrl]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamNameUrl` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Team_url_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "url",
ADD COLUMN     "teamNameUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamNameUrl_key" ON "Team"("teamNameUrl");
