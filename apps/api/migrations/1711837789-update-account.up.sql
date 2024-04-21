BEGIN;
-- Type: sex_enum

-- DROP TYPE IF EXISTS public.sex_enum cascade;

CREATE TYPE public.sex_enum AS ENUM
    ('male', 'female');

ALTER TYPE public.sex_enum
    OWNER TO supabase_admin;

CREATE TABLE IF NOT EXISTS public.interest
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text COLLATE pg_catalog."default",
    CONSTRAINT interest_pkey PRIMARY KEY (id),
    CONSTRAINT interest_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.interest
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.interest
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.interest TO anon;

GRANT ALL ON TABLE public.interest TO authenticated;

GRANT ALL ON TABLE public.interest TO postgres;

GRANT ALL ON TABLE public.interest TO service_role;

GRANT ALL ON TABLE public.interest TO supabase_admin;

ALTER TABLE IF EXISTS public.account
    ADD COLUMN IF NOT EXISTS about_me text COLLATE pg_catalog."default";

ALTER TABLE IF EXISTS public.account
    ADD COLUMN IF NOT EXISTS birthday date;

ALTER TABLE IF EXISTS public.account
    ADD COLUMN IF NOT EXISTS interests text[] COLLATE pg_catalog."default";

ALTER TABLE IF EXISTS public.account
    ADD COLUMN IF NOT EXISTS sex sex_enum;

ALTER TABLE IF EXISTS public.account
    ADD COLUMN metadata jsonb;


UPDATE account
    SET status = 'Incomplete'
    WHERE status = 'Complete';

END;