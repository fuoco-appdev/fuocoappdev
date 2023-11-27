CREATE TABLE IF NOT EXISTS public.product_likes
(
    product_id character varying COLLATE pg_catalog."default",
    account_id uuid,
    CONSTRAINT product_likes_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT product_likes_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES public.product (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_likes
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.product_likes
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.product_likes TO anon;

GRANT ALL ON TABLE public.product_likes TO authenticated;

GRANT ALL ON TABLE public.product_likes TO postgres;

GRANT ALL ON TABLE public.product_likes TO service_role;

GRANT ALL ON TABLE public.product_likes TO supabase_admin;