CREATE TABLE IF NOT EXISTS public.account_followers
(
    account_id uuid NOT NULL,
    follower_id uuid,
    accepted boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp with time zone,
    CONSTRAINT account_followers_pkey PRIMARY KEY (account_id),
    CONSTRAINT account_followers_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT account_followers_follower_id_fkey FOREIGN KEY (follower_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.account_followers
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.account_followers
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.account_followers TO anon;

GRANT ALL ON TABLE public.account_followers TO authenticated;

GRANT ALL ON TABLE public.account_followers TO postgres;

GRANT ALL ON TABLE public.account_followers TO service_role;

GRANT ALL ON TABLE public.account_followers TO supabase_admin;