BEGIN;
-- Type: device_type_enum

-- DROP TYPE IF EXISTS public.device_type_enum cascade;

CREATE TYPE public.device_type_enum AS ENUM
    ('escpos');

ALTER TYPE public.device_type_enum
    OWNER TO supabase_admin;

CREATE TABLE IF NOT EXISTS public.device
(
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    type device_type_enum,
    stock_location_id character varying COLLATE pg_catalog."default",
    metadata jsonb,
    updated_at timestamp with time zone,
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text COLLATE pg_catalog."default",
    CONSTRAINT device_pkey PRIMARY KEY (id),
    CONSTRAINT device_id_key UNIQUE (id),
    CONSTRAINT device_stock_location_id_fkey FOREIGN KEY (stock_location_id)
        REFERENCES public.stock_location (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.device
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.device
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.device TO anon;

GRANT ALL ON TABLE public.device TO authenticated;

GRANT ALL ON TABLE public.device TO postgres;

GRANT ALL ON TABLE public.device TO service_role;

GRANT ALL ON TABLE public.device TO supabase_admin;

END;