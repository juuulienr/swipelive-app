<template>
  <div v-if="product" class="product">
    <div v-if="product.uploads.length > 0" style="width: 100%;">
      <div v-for="upload in product.uploads" :key="upload.id" class="vue-slick">
        <img :src="$cloudinary750x750 + upload.filename">
      </div>
    </div>
    <div v-else style="width: 100vw;">
      <div class="vue-slick">
        <img src="/img/no-preview.png">
      </div>
    </div>

    <div class="product--info">
      <div class="row">
        <div class="col-12">
          <div class="title">{{ product.title }}</div>
          <div v-if="variant && variant.price" class="new-price" style="color: rgb(24, 206, 160);">{{ $formatPrice(variant.price) }}€</div>
          <div v-else class="new-price" style="color: rgb(24, 206, 160);">{{ $formatPrice(product.price) }}€</div>
          <div v-if="variant && variant.compareAtPrice" class="last-price" style="font-size: 13px; font-weight: 500;">{{ $formatPrice(variant.compareAtPrice) }}€</div>
          <div v-if="!variant && product.compareAtPrice" class="last-price" style="font-size: 13px; font-weight: 500;">{{ $formatPrice(product.compareAtPrice) }}€</div>
        </div>
      </div>
      <div v-if="promotion" style="margin-top: 10px; margin-bottom: -5px;">
        <img src="/img/discount.svg" style="width: 24px;height: 24px;transform: rotate(-30deg);">
        <span v-if="promotion.type == 'percent'" style="margin-left: 4Px; line-height: 17p; font-size: 14Px; color: #f60;">-{{ promotion.value }}% supplémentaire à la caisse</span> 
        <span v-else style="margin-left: 4Px; line-height: 17p; font-size: 14Px; color: #f60;">-{{ promotion.value }}€ supplémentaire à la caisse</span> 
      </div>

      <div v-if="product.options.length">
        <hr style="margin: 20px 0px;">
        
        <template v-if="product.options[0]">
          <div class="technology" style="font-weight: 400;">{{ product.options[0].name }}</div>
          <div class="variants">
            <template v-for="option1 in available" :key="option1.name">
              <div
                v-if="option1.available"
                class="option"
                :class="{'active': selected == option1.name}"
                @click="updateVariant(option1.name, option1.available)"
              >
                {{ option1.name }}
              </div>
            </template>
          </div>
        </template>

        <template v-if="product.options.length > 1 && product.options[1]">
          <div class="technology" style="margin-top: 15px; font-weight: 400;">{{ product.options[1].name }}</div>
          <div class="variants">
            <template v-for="option2 in available2" :key="option2.name">
              <div
                v-if="option2.available"
                class="option"
                :class="{'active': selected2 == option2.name}"
                @click="updateVariant2(option2.name, option2.available)"
              >
                {{ option2.name }}
              </div>
            </template>
          </div>
        </template>
      </div>


      <div style="margin-bottom: 20px;">
        <hr style="margin: 20px 0px;">
        <div style="margin-top: 10px; font-size: 15px; color: rgb(82, 92, 102); font-weight: 400;" v-html="product.description"></div>
      </div>
      <hr>
      <div style="padding: 5px;">Échanges & Retours</div>
      <div style="font-weight: 400; padding: 5px; font-size: 15px; color: rgb(82, 92, 102);">
        Les marques sont responsables du remplacement des produits qui arrivent endommagés ou perdus lors de la livraison. Swipe Live n'accepte pas les retours ni les échanges. 
        <br> <br> 
        Dans l'un de ces cas, veuillez contacter la marque via la messagerie pour résoudre le problème. Assurez-vous d'inclure votre numéro de commande, le nom du produit et la raison.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['product'],
  data() {
    return {
      id: this.$route.params.id,
      variant: null,
      available: [],
      available2: [],
      unavailable: false,
      promotion: null,
      selected: "",
      selected2: "",
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      safeareaBottom: '50px',
      settings: {
        dots: true,
      }
    }
  },
  async created() {
    if (this.product.description) {
      this.product.description = this.product.description.replace(/\n/g, '<br>');
    }

    this.loadOptions();

    if (this.product.id) {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/promotions/active/${this.product.id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.promotion = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des promotions actives :', error);
      }
    }
  },
  methods: {
    updateVariant(option1, available) {
      if (available) {
        if (this.product.options.length == 1) {
          this.product.variants.forEach((variant) => {
            if (variant.option1 == option1) {
              this.variant = variant;
              this.selected = option1;
            }
          });
        } else {
          this.available2 = [];
          this.selected2 = "";
          this.product.options[1].data.forEach((option2) => {
            const stock = this.product.variants.some((variant) => {
              if (variant.option1 == option1) {
                this.selected = option1;
                if (variant.option2 == option2) {
                  if (variant.quantity != 0) {
                    if (!this.selected2) {
                      this.selected2 = option2;
                      this.variant = variant;
                    }
                    return true;
                  }
                  return false;
                }
              }
            });

            this.available2.push({ name: option2, available: stock });
          });
        }
        this.$emit('selectVariant', this.variant);
      }
    },
    updateVariant2(option2, available) {
      if (available) {
        this.product.variants.forEach((variant) => {
          if (variant.option2 == option2) {
            this.variant = variant;
            this.selected2 = option2;
          }
        });
        this.$emit('selectVariant', this.variant);
      }
    },
    loadOptions() {
      if (this.product.variants && this.product.variants.length && this.product.options.length) {
        if (this.product.options.length == 1) {
          this.product.options[0].data.forEach((name) => {
            const stock = this.product.variants.some((variant) => {
              if (variant.option1 == name) {
                if (variant.quantity != 0) {
                  if (!this.selected) {
                    this.selected = name;
                    this.variant = variant;
                    this.$emit('selectVariant', this.variant);
                  }
                  return true;
                }
              }
              return false;
            });

            this.available.push({ name: name, available: stock });
          });
        } else {
          this.product.options[0].data.forEach((name, index) => {
            let stock = false;
            this.product.options[1].data.forEach((name2) => {
              const stock2 = this.product.variants.some((variant) => {
                if (variant.option1 == name && variant.option2 == name2) {
                  if (variant.quantity != 0) {
                    stock = true;
                    if (!this.selected) {
                      this.selected = name;
                      this.selected2 = name2;
                      this.variant = variant;
                      this.$emit('selectVariant', this.variant);
                    }
                    return true;
                  }
                }
                return false;
              });

              if (index == 0) {
                this.available2.push({ name: name2, available: stock2 });
              }
            });

            this.available.push({ name: name, available: stock });
          });
        }

        if (!this.variant) {
          this.unavailable = true;          
        }
      }
    },
  }
};
</script>

<style scoped src="../assets/css/product.css"></style>
