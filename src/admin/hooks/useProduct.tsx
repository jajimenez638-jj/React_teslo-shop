import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProducByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interfaces";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProducByIdAction(id),
        retry: false,
        staleTime: 6000 * 5
    });

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            console.log('Todos salió bien', product);
            // Invalidar caché
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] });

            // Actualizar queryData
            queryClient.setQueryData(['products', { id: product.id }], product);
        }
    })

    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log(productLike);
    // }

    return {
        ...query,
        mutation
    }
}