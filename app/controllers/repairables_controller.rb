class RepairablesController < ApplicationController
  before_action :set_repairable, only: [:show, :edit, :update, :destroy]

  # GET /repairables
  # GET /repairables.json
  def index
    if params[:search] === "" 
      @repairables = Repairable.all
    else
      @repairables = Repairable.search(params[:search])
    end
  end

  # GET /repairables/search
  def search
    @repairables = Repairable.search(params[:search])
  end

  # GET /repairables/1
  # GET /repairables/1.json
  def show
  end

  # GET /repairables/new
  def new
    @repairable = Repairable.new
  end

  # GET /repairables/1/edit
  def edit
  end

  # POST /repairables
  # POST /repairables.json
  def create
    @repairable = Repairable.new(repairable_params)

    respond_to do |format|
      if @repairable.save
        format.html { redirect_to @repairable, notice: 'Repairable was successfully created.' }
        format.json { render :show, status: :created, location: @repairable }
      else
        format.html { render :new }
        format.json { render json: @repairable.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /repairables/1
  # PATCH/PUT /repairables/1.json
  def update
    respond_to do |format|
      if @repairable.update(repairable_params)
        format.html { redirect_to @repairable, notice: 'Repairable was successfully updated.' }
        format.json { render :show, status: :ok, location: @repairable }
      else
        format.html { render :edit }
        format.json { render json: @repairable.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /repairables/1
  # DELETE /repairables/1.json
  def destroy
    @repairable.destroy
    respond_to do |format|
      format.html { redirect_to repairables_url, notice: 'Repairable was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repairable
      @repairable = Repairable.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def repairable_params
      params.fetch(:repairable, {})
    end
end
