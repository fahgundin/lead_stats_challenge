CREATE TYPE "public"."priority" AS ENUM('LOW', 'MEDIUM', 'HIGH');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('TODO', 'IN_POGRESS', 'DONE');--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"priority" "priority",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"dueDate" date,
	"assignedTo" varchar(255) NOT NULL,
	"tags" varchar(25)[],
	"estimatedHours" integer
);
