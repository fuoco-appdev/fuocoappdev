CREATE TABLE IF NOT EXISTS public.account_notification
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    event_name text COLLATE pg_catalog."default",
    resource_type text COLLATE pg_catalog."default",
    resource_id text COLLATE pg_catalog."default",
    account_id uuid,
    data jsonb,
    updated_at timestamp with time zone,
    seen boolean DEFAULT false,
    CONSTRAINT account_notification_pkey PRIMARY KEY (id),
    CONSTRAINT account_notification_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.account_notification
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.account_notification
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.account_notification TO anon;

GRANT ALL ON TABLE public.account_notification TO authenticated;

GRANT ALL ON TABLE public.account_notification TO postgres;

GRANT ALL ON TABLE public.account_notification TO service_role;

GRANT ALL ON TABLE public.account_notification TO supabase_admin;