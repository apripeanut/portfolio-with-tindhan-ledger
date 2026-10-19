CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"year" integer NOT NULL,
	"summary" text,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
